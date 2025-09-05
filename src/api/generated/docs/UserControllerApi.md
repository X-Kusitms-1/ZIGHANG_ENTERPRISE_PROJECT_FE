# UserControllerApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**postUserOnboardingInfo**](#postuseronboardinginfo) | **POST** /v1/user/onboarding | 사용자 온보딩 정보 저장|

# **postUserOnboardingInfo**
> RspTemplateVoid postUserOnboardingInfo(postUserOnboardingDto)

사용자의 온보딩 정보(경력, 관심지역 목록, 관심산업 목록)를 저장합니다. 기존 저장 데이터가 있으면 모두 삭제 후 새로 받은 정보로 대체합니다.

### Example

```typescript
import {
    UserControllerApi,
    Configuration,
    PostUserOnboardingDto
} from '@zighang/api-client';

const configuration = new Configuration();
const apiInstance = new UserControllerApi(configuration);

let postUserOnboardingDto: PostUserOnboardingDto; //

const { status, data } = await apiInstance.postUserOnboardingInfo(
    postUserOnboardingDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **postUserOnboardingDto** | **PostUserOnboardingDto**|  | |


### Return type

**RspTemplateVoid**

### Authorization

[jwtAuth](../README.md#jwtAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | 유저 온보딩 POST API 호출에 성공했습니다. |  -  |
|**404** | 존재하지 않는 사용자 정보입니다. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

