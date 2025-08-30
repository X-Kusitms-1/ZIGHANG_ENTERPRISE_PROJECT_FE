# EmailControllerApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**sendEmail**](#sendemail) | **POST** /v1/email | |

# **sendEmail**
> object sendEmail()


### Example

```typescript
import {
    EmailControllerApi,
    Configuration
} from '@zighang/api-client';

const configuration = new Configuration();
const apiInstance = new EmailControllerApi(configuration);

const { status, data } = await apiInstance.sendEmail();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**object**

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

