# SubscriptionControllerApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**register**](#register) | **POST** /v1/subscriptions | |
|[**unregister**](#unregister) | **DELETE** /v1/subscriptions | |

# **register**
> RspTemplateListSubscriptionResponse register(subscriptionRequest)


### Example

```typescript
import {
    SubscriptionControllerApi,
    Configuration,
    SubscriptionRequest
} from '@zighang/api-client';

const configuration = new Configuration();
const apiInstance = new SubscriptionControllerApi(configuration);

let subscriptionRequest: SubscriptionRequest; //

const { status, data } = await apiInstance.register(
    subscriptionRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **subscriptionRequest** | **SubscriptionRequest**|  | |


### Return type

**RspTemplateListSubscriptionResponse**

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

# **unregister**
> RspTemplateListSubscriptionResponse unregister(subscriptionRequest)


### Example

```typescript
import {
    SubscriptionControllerApi,
    Configuration,
    SubscriptionRequest
} from '@zighang/api-client';

const configuration = new Configuration();
const apiInstance = new SubscriptionControllerApi(configuration);

let subscriptionRequest: SubscriptionRequest; //

const { status, data } = await apiInstance.unregister(
    subscriptionRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **subscriptionRequest** | **SubscriptionRequest**|  | |


### Return type

**RspTemplateListSubscriptionResponse**

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

