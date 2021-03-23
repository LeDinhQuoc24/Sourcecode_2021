<?php

namespace App\Http\Controllers\Api\V1\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use GuzzleHttp\Client;
use Illuminate\Http\Request;
use App\Services\AuthService;
use Illuminate\Support\Facades\Auth;
use ProxyRequest;

/**
 * Class AuthController
 * @package App\Http\Controllers\Api\V1\Auth
 */
class AuthController extends Controller
{
    protected $authService;

    public function __construct(AuthService $authService)
    {
        $this->middleware('auth:api', ['except' => ['register', 'login']]);
        $this->authService = $authService;

    }


    public function register(Request $request)
    {
        $user = $this->authService->register($request->all());

        if (!$user) {
            return response()->json([
                'data' => [
                    'message' => 'Register failed!',
                ],
            ]);
        }

        return response()->json([
            'data' => [
                'user' => $user,
                'message' => 'Register successfully!',
            ],
        ]);
    }

    public function login(Request $request)
    {
//        try {
//            $client = new Client();
//            $response = $client->post('http://localhost:8000/oauth/token', [
//                'form_params' => [
//                    'grant_type' => 'password',
//                    'client_id' => '2',
//                    'client_secret' => 'pIK6kDiH3QKy7hjYkyIUaIpJoJ0MUcQC6CUWlLwl',
//                    'username' => $request->get('email'),
//                    'password' => $request->get('password'),
//                    'scope' => '',
//                ],
//            ]);
//            return json_decode((string)$response->getBody(), true);
//        } catch (\Exception $exception) {
//            return response()->json([
//                'error' => 'invalid_credentials',
//                'message' => "{$exception->getCode()}: {$exception->getMessage()}",
//            ], 401);
//        }

        $data = [
            'email' => $request->email,
            'password' => $request->password
        ];

        if (auth()->attempt($data)) {
            $token = auth()->user()->createToken('Token Name')->accessToken;
            return $token;
//            return  response()->json([
//                'access_token' => $token->accessToken,
////                'token_type' => 'Bearer',
////                'expires_in' => auth()->factory()->getTTL() * 60
//            ]);
//        return $this->respondWithToken($token);
        } else {
            return response()->json(['error' => 'Unauthorised'], 401);
        }


//        $result = $this->authService->login($request->only(['email', 'password']));
//
//        if (empty($result)) {
//            return response()->json([
//                'data' => [
//                    'message' => 'Login failed!',
//                ],
//            ]);
//        }
//
//        return response()->json([
//            'data' => [
//                'access_token' => $result['access_token'],
//                'message' => 'Login successfully!',
//            ],
//        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->token()->revoke();

        return response()->json([
            'data' => [
                'message' => 'Logout successfully!',
            ],
        ]);
    }

    public function me(Request $request)
    {
//        return $request->user();
        return response()->json(auth()->user());


    }

    public function refresh(Request $request)
    {
        $request->user()->token()->revoke();
        $token = auth()->user()->createToken('Token Name')->accessToken;
        return $token;
    }

    protected function respondWithToken($token)
    {
        return response()->json([
            'token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
        ]);
    }
}


