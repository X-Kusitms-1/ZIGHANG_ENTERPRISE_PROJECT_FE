# ImageControllerApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**presignedUrl**](#presignedurl) | **GET** /v1/image/presigned-url | |

# **presignedUrl**
> PreSignedUrlResponse presignedUrl()


### Example

```typescript
import {
    ImageControllerApi,
    Configuration
} from '@zighang/api-client';

const configuration = new Configuration();
const apiInstance = new ImageControllerApi(configuration);

let prefix: string; // (default to undefined)
let fileName: string; // (default to undefined)

const { status, data } = await apiInstance.presignedUrl(
    prefix,
    fileName
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **prefix** | [**string**] |  | defaults to undefined|
| **fileName** | [**string**] |  | defaults to undefined|


### Return type

**PreSignedUrlResponse**

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

