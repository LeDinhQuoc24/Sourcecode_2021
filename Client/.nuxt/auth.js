import Middleware from './middleware'
import { Auth, authMiddleware, ExpiredAuthSessionError } from '~auth/runtime'

// Active schemes
import { RefreshScheme } from '~auth/runtime'
import { Oauth2Scheme } from '~auth/runtime'
import { Auth0Scheme } from '~auth/runtime'

Middleware.auth = authMiddleware

export default function (ctx, inject) {
  // Options
  const options = {
  "resetOnError": false,
  "ignoreExceptions": false,
  "scopeKey": "scope",
  "rewriteRedirects": true,
  "fullPathRedirect": false,
  "watchLoggedIn": true,
  "redirect": {
    "login": "/login",
    "logout": "/",
    "home": "/profile",
    "callback": "/login"
  },
  "vuex": {
    "namespace": "auth"
  },
  "cookie": {
    "prefix": "auth.",
    "options": {
      "path": "/"
    }
  },
  "localStorage": {
    "prefix": "auth."
  },
  "defaultStrategy": "laravelPassport"
}

  // Create a new Auth instance
  const $auth = new Auth(ctx, options)

  // Register strategies
  // laravelPassport
  $auth.registerStrategy('laravelPassport', new RefreshScheme($auth, {
  "name": "laravelPassport",
  "url": "/backend",
  "endpoints": {
    "token": "/backend/oauth/token",
    "login": {
      "baseURL": "",
      "url": "/_auth/laravelPassport/token"
    },
    "refresh": {
      "baseURL": "",
      "url": "/_auth/laravelPassport/token"
    },
    "logout": {
      "url": "/backendapi/auth/logout",
      "method": "post"
    },
    "user": {
      "url": "/backendapi/auth/user"
    }
  },
  "clientId": "10",
  "grantType": "password",
  "token": {
    "property": "access_token",
    "type": "Bearer",
    "name": "Authorization",
    "maxAge": 31536000
  },
  "refreshToken": {
    "property": "refresh_token",
    "data": "refresh_token",
    "maxAge": 2592000
  },
  "user": {
    "property": false
  }
}))

  // social
  $auth.registerStrategy('social', new Oauth2Scheme($auth, {
  "endpoints": {
    "authorization": "https://accounts.google.com/o/oauth2/auth",
    "userInfo": "https://www.googleapis.com/oauth2/v3/userinfo",
    "logout": "https://example.com/logout"
  },
  "token": {
    "property": "access_token",
    "type": "Bearer",
    "maxAge": 1800
  },
  "refreshToken": {
    "property": "refresh_token",
    "maxAge": 2592000
  },
  "responseType": "token",
  "grantType": "authorization_code",
  "clientId": "SET_ME",
  "scope": [
    "openid",
    "profile",
    "email"
  ],
  "state": "UNIQUE_AND_NON_GUESSABLE",
  "codeChallengeMethod": "",
  "responseMode": "",
  "acrValues": "",
  "name": "social"
}))

  // auth0
  $auth.registerStrategy('auth0', new Auth0Scheme($auth, {
  "domain": "nuxt-auth.auth0.com",
  "clientId": "q8lDHfBLJ-Fsziu7bf351OcYQAIe3UJv",
  "name": "auth0",
  "endpoints": {
    "authorization": "https://nuxt-auth.auth0.com/authorize",
    "userInfo": "https://nuxt-auth.auth0.com/userinfo",
    "token": "https://nuxt-auth.auth0.com/oauth/token",
    "logout": "https://nuxt-auth.auth0.com/v2/logout"
  },
  "scope": [
    "openid",
    "profile",
    "email"
  ]
}))

  // facebook
  $auth.registerStrategy('facebook', new Oauth2Scheme($auth, {
  "endpoints": {
    "authorization": "https://facebook.com/v2.12/dialog/oauth",
    "userInfo": "https://graph.facebook.com/v2.12/me?fields=about,name,picture{url},email,birthday"
  },
  "clientId": "1671464192946675",
  "scope": [
    "public_profile",
    "email",
    "public_profile",
    "email",
    "user_birthday"
  ],
  "name": "facebook"
}))

  // google
  $auth.registerStrategy('google', new Oauth2Scheme($auth, {
  "clientId": "956748748298-kr2t08kdbjq3ke18m3vkl6k843mra1cg.apps.googleusercontent.com",
  "codeChallengeMethod": "",
  "name": "google",
  "endpoints": {
    "authorization": "https://accounts.google.com/o/oauth2/auth",
    "userInfo": "https://www.googleapis.com/oauth2/v3/userinfo"
  },
  "scope": [
    "openid",
    "profile",
    "email"
  ]
}))

  // github
  $auth.registerStrategy('github', new Oauth2Scheme($auth, {
  "name": "github",
  "endpoints": {
    "authorization": "https://github.com/login/oauth/authorize",
    "token": "/_auth/oauth/github/authorize",
    "userInfo": "https://api.github.com/user"
  },
  "scope": [
    "user",
    "email"
  ],
  "responseType": "code"
}))

  // Inject it to nuxt context as $auth
  inject('auth', $auth)
  ctx.$auth = $auth

  // Initialize auth
  return $auth.init().catch(error => {
    if (process.client) {
      // Don't console log expired auth session errors. This error is common, and expected to happen.
      // The error happens whenever the user does an ssr request (reload/initial navigation) with an expired refresh
      // token. We don't want to log this as an error.
      if (error instanceof ExpiredAuthSessionError) {
        return
      }

      console.error('[ERROR] [AUTH]', error)
    }
  })
}
