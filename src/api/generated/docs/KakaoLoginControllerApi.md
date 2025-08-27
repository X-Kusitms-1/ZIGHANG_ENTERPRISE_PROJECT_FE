# KakaoLoginControllerApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**kakaoLogin**](#kakaologin) | **GET** /v1/auth/kakao | 카카오 소셜 로그인|

# **kakaoLogin**
> TokenResult kakaoLogin()

카카오 인가 코드로 소셜 로그인을 진행하며, 성공 시 서비스 자체 JWT(Access/Refresh Token)와 신규 가입 여부를 반환합니다. 처음 로그인한 유저의 경우 isNewUser가 참으로 내려갑니다. 

### Example

```typescript
import {
    KakaoLoginControllerApi,
    Configuration
} from '@zighang/api-client';

const configuration = new Configuration();
const apiInstance = new KakaoLoginControllerApi(configuration);

let code: string; // (default to undefined)

const { status, data } = await apiInstance.kakaoLogin(
    code
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **code** | [**string**] |  | defaults to undefined|


### Return type

**TokenResult**

### Authorization

[jwtAuth](../README.md#jwtAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

