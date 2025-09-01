# CompanyControllerApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**getDetail**](#getdetail) | **GET** /v1/companies/{companyId} | |
|[**getSubscribedCompaniesWithNews**](#getsubscribedcompanieswithnews) | **GET** /v1/companies/{userId}/subscriptions | |
|[**searchWithNews**](#searchwithnews) | **GET** /v1/companies | |

# **getDetail**
> CompanyDetailWithSimilarResponse getDetail()


### Example

```typescript
import {
    CompanyControllerApi,
    Configuration
} from '@zighang/api-client';

const configuration = new Configuration();
const apiInstance = new CompanyControllerApi(configuration);

let companyId: number; // (default to undefined)

const { status, data } = await apiInstance.getDetail(
    companyId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **companyId** | [**number**] |  | defaults to undefined|


### Return type

**CompanyDetailWithSimilarResponse**

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

# **getSubscribedCompaniesWithNews**
> RspTemplateListCompanyWithNewsResponse getSubscribedCompaniesWithNews()


### Example

```typescript
import {
    CompanyControllerApi,
    Configuration
} from '@zighang/api-client';

const configuration = new Configuration();
const apiInstance = new CompanyControllerApi(configuration);

let userId: number; // (default to undefined)

const { status, data } = await apiInstance.getSubscribedCompaniesWithNews(
    userId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **userId** | [**number**] |  | defaults to undefined|


### Return type

**RspTemplateListCompanyWithNewsResponse**

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

# **searchWithNews**
> PageCompanyWithNewsResponse searchWithNews()


### Example

```typescript
import {
    CompanyControllerApi,
    Configuration
} from '@zighang/api-client';

const configuration = new Configuration();
const apiInstance = new CompanyControllerApi(configuration);

let types: Set<'LARGE_ENTERPRISE' | 'MID_SIZED_ENTERPRISE' | 'SMALL_MEDIUM_ENTERPRISE' | 'STARTUP' | 'UNICORN' | 'FOREIGN_COMPANY' | 'PUBLIC_OR_STATE_OWNED' | 'FINANCIAL_SERVICES' | 'OTHER'>; // (optional) (default to undefined)
let jobGroups: Set<'SOFTWARE_ENGINEERING' | 'DATA_AI' | 'DESIGN' | 'PRODUCT_MANAGEMENT' | 'MARKETING_ADS_PR' | 'SALES_BUSINESS' | 'BUSINESS_ADMIN_HR' | 'CUSTOMER_SUCCESS_SUPPORT' | 'MANUFACTURING_QA_PROCUREMENT' | 'LOGISTICS_TRANSPORT' | 'RESEARCH_RND' | 'EDUCATION' | 'MEDICAL_BIO' | 'OTHER_PROFESSIONALS'>; // (optional) (default to undefined)
let regionCodes: Set<string>; // (optional) (default to undefined)
let page: number; // (optional) (default to 0)
let size: number; // (optional) (default to 20)
let sort: string; // (optional) (default to 'companyNameKr,asc')

const { status, data } = await apiInstance.searchWithNews(
    types,
    jobGroups,
    regionCodes,
    page,
    size,
    sort
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **types** | **Array<&#39;LARGE_ENTERPRISE&#39; &#124; &#39;MID_SIZED_ENTERPRISE&#39; &#124; &#39;SMALL_MEDIUM_ENTERPRISE&#39; &#124; &#39;STARTUP&#39; &#124; &#39;UNICORN&#39; &#124; &#39;FOREIGN_COMPANY&#39; &#124; &#39;PUBLIC_OR_STATE_OWNED&#39; &#124; &#39;FINANCIAL_SERVICES&#39; &#124; &#39;OTHER&#39;>** |  | (optional) defaults to undefined|
| **jobGroups** | **Array<&#39;SOFTWARE_ENGINEERING&#39; &#124; &#39;DATA_AI&#39; &#124; &#39;DESIGN&#39; &#124; &#39;PRODUCT_MANAGEMENT&#39; &#124; &#39;MARKETING_ADS_PR&#39; &#124; &#39;SALES_BUSINESS&#39; &#124; &#39;BUSINESS_ADMIN_HR&#39; &#124; &#39;CUSTOMER_SUCCESS_SUPPORT&#39; &#124; &#39;MANUFACTURING_QA_PROCUREMENT&#39; &#124; &#39;LOGISTICS_TRANSPORT&#39; &#124; &#39;RESEARCH_RND&#39; &#124; &#39;EDUCATION&#39; &#124; &#39;MEDICAL_BIO&#39; &#124; &#39;OTHER_PROFESSIONALS&#39;>** |  | (optional) defaults to undefined|
| **regionCodes** | **Set&lt;string&gt;** |  | (optional) defaults to undefined|
| **page** | [**number**] |  | (optional) defaults to 0|
| **size** | [**number**] |  | (optional) defaults to 20|
| **sort** | [**string**] |  | (optional) defaults to 'companyNameKr,asc'|


### Return type

**PageCompanyWithNewsResponse**

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

