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

export interface StrategyOptions extends OAuth2Strategy.StrategyOptions {
  botPrompt: string;
  prompt: string;
  uiLocales: string;
}

export default class LineStrategy extends OAuth2Strategy {
  private _profileURL: string;
  private _botPrompt: string;
  private _uiLocales: string;
  private _prompt: string;

  constructor(options: StrategyOptions, verify: OAuth2Strategy.VerifyFunction) {
    const { botPrompt, prompt, uiLocales, ...rest } = {
      ...DEFAULT_OPTIONS,
      ...options,
    };

    super(rest, verify);

    this._profileURL = rest.profileURL;
    this._botPrompt = botPrompt;
    this._uiLocales = uiLocales;
    this._prompt = prompt;
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
