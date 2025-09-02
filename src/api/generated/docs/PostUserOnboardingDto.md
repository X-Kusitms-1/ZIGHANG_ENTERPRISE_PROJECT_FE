# PostUserOnboardingDto


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**userId** | **number** | 사용자 ID (토큰 구현 전까지 임시 사용) | [optional] [default to undefined]
**minCareer** | **number** | 최소 경력 연차 (신입: 0, 1년차: 1, 2년차: 2...) | [optional] [default to undefined]
**maxCareer** | **number** | 최대 경력 연차 (신입: 0, 1년차: 1, 2년차: 2...) | [optional] [default to undefined]
**addressList** | [**Array&lt;AddressDto&gt;**](AddressDto.md) | 관심 지역 목록 | [optional] [default to undefined]
**industryList** | [**Array&lt;IndustryDto&gt;**](IndustryDto.md) | 관심 산업/직무 목록 | [optional] [default to undefined]

## Example

```typescript
import { PostUserOnboardingDto } from '@zighang/api-client';

const instance: PostUserOnboardingDto = {
    userId,
    minCareer,
    maxCareer,
    addressList,
    industryList,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
