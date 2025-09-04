# OcrControllerApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**ocrByUrl**](#ocrbyurl) | **POST** /api/ocr/json | |
|[**ocrTextByUrl**](#ocrtextbyurl) | **POST** /api/ocr/json/text | |

# **ocrByUrl**
> ClovaOcrResponse ocrByUrl()


### Example

```typescript
import {
    OcrControllerApi,
    Configuration
} from '@zighang/api-client';

const configuration = new Configuration();
const apiInstance = new OcrControllerApi(configuration);

let imageUrl: string; // (default to undefined)

const { status, data } = await apiInstance.ocrByUrl(
    imageUrl
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **imageUrl** | [**string**] |  | defaults to undefined|


### Return type

**ClovaOcrResponse**

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

# **ocrTextByUrl**
> string ocrTextByUrl()


### Example

```typescript
import {
    OcrControllerApi,
    Configuration
} from '@zighang/api-client';

const configuration = new Configuration();
const apiInstance = new OcrControllerApi(configuration);

let imageUrl: string; // (default to undefined)

const { status, data } = await apiInstance.ocrTextByUrl(
    imageUrl
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **imageUrl** | [**string**] |  | defaults to undefined|


### Return type

**string**

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

