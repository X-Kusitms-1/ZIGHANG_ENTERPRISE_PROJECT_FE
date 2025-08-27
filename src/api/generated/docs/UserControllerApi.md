# UserControllerApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**postUserOnboardingInfo**](#postuseronboardinginfo) | **POST** /v1/user/onboarding | 사용자 온보딩 정보|

# **postUserOnboardingInfo**
> RspTemplateVoid postUserOnboardingInfo(postUserOnboardingDto)


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
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

