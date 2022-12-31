import { Request } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import OAuth2Strategy from 'passport-oauth2';
import { ParsedQs } from 'qs';

const DEFAULT_OPTIONS = {
  useAuthorizationHeaderforGET: true,
  authorizationURL: 'https://access.line.me/oauth2/v2.1/authorize',
  tokenURL: 'https://api.line.me/oauth2/v2.1/token',
  profileURL: 'https://api.line.me/v2/profile',
  scope: ['profile', 'openid'],
  botPrompt: null, //normal / aggressive
  uiLocales: null, // ref: https://gist.github.com/msikma/8912e62ed866778ff8cd
};

export interface StrategyOptions
  extends Partial<OAuth2Strategy.StrategyOptions> {
  channelID: string;
  channelSecret: string;
  callbackURL: string;
  prompt: string;
  name?: string;
  botPrompt?: string;
  uiLocales?: string;
  profileURL?: string;
}

const getOAuth2StrategyOptions = (
  _options: StrategyOptions
): OAuth2Strategy.StrategyOptions => {
  return {
    ..._options,
    ...DEFAULT_OPTIONS,
    clientID: _options.channelID,
    clientSecret: _options.channelSecret,
  };
};

export default class LineStrategy extends OAuth2Strategy {
  private _profileURL: string;
  private _botPrompt: string | null;
  private _uiLocales: string | null;
  private _prompt: string;

  constructor(
    options: StrategyOptions,
    verify: (
      accessToken: string,
      refreshToken: string,
      profile: unknown,
      verified: (err?: Error | null, user?: unknown, info?: unknown) => void
    ) => void
  ) {
    const oauth2StrategyOptions = getOAuth2StrategyOptions(options);
    super(oauth2StrategyOptions, verify);

    this.name = options.name = 'line';
    this._profileURL = options.profileURL || DEFAULT_OPTIONS.profileURL;
    this._botPrompt = options.botPrompt || DEFAULT_OPTIONS.botPrompt;
    this._uiLocales = options.uiLocales || DEFAULT_OPTIONS.uiLocales;
    this._prompt = options.prompt;
  }

  authenticate(
    req: Request<
      ParamsDictionary,
      unknown,
      unknown,
      ParsedQs,
      Record<string, unknown>
    >,
    options?: unknown
  ): void {
    if (req.query && req.query.error_code && !req.query.error) {
      return this.error(
        new Error(
          JSON.stringify({
            name: 'LineAuthorizationError',
            message: req.query.error,
            code: req.query.error_code,
          })
        )
      );
    }
    super.authenticate(req, options);
  }

  userProfile(
    accessToken: string,
    done: (err?: Error | null | undefined, profile?: unknown) => void
  ): void {
    this._oauth2.get(this._profileURL, accessToken, (err, body) => {
      if (err) {
        return done(
          new OAuth2Strategy.InternalOAuthError(
            'Failed to fetch user profile',
            err
          )
        );
      }
      try {
        const json = JSON.parse(body as string);
        const profile = {
          ...json,
          provider: 'line',
          _raw: body,
        };
        done(null, profile);
      } catch (e) {
        done(e as Error);
      }
    });
  }

  authorizationParams(options: unknown): object {
    return {
      ...super.authorizationParams(options),
      bot_prompt: this._botPrompt,
      ui_locales: this._uiLocales,
      prompt: this._prompt,
    };
  }
}
