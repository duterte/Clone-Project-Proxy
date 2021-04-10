### TASK

- [ ] Check auth of an incoming request. Every access attempt (both successful and not successful) should be logged (log params and username from provided credentials).

- [x] Get all params from incoming requests.

  1. - [x] Add param "withDataInsights=true" to parameters list (or replace it if already exists)
  1. - [x] If param "tier" or "withAttribution" specified, stop work and return an error

- [x] Execute request with these params to URL1. Result can include several returned licenses, all of them should be treated as described below. In case of more than 100 licenses found, stop work and return an error.

- [x] Get value of "tier" field and determine license size.

  1. - [x] It can include size already. Format "<Number> Users" (i.e. 100 Users or 2000 Users). Or sometimes "Unlimited Users". In this case additional lookup with URL2 is not needed. The number will be processed later.
  1. - [ ] "Evaluation" or "Demonstration License". Should check field "evaluationOpportunitySize". If this field contains decimal number (alternatively it can be empty or "NA" or "Unknown" or something else), use it. If there is no number, left tier untouched. No additional lookup needed.
  1. - [ ] Subscription. This is the case when additional lookup with URL2 is needed.
     1. - [x] Execute request URL2?text=<licenseId>&addon=<addonKey>&sortBy=date&order=desc&limit=1 (to get the last transaction linked to this license).
     1. - [x] If something was returned, you need to doublecheck if licenseId in request and response are fully equal, because it's just a search by substring and it, theoretically, can return mismatched result.
     1. - [x] Get transactions/purchaseDetails/tier, it should be like "Per Unit Pricing (27 users)". Extracted number is the resulting license size.
     1. - [ ] If attempt to get license size from URL2 was unsuccessful, then app should try to get decimal value from evaluationOpportunitySize field from URL1 response (as in the "Evaluation" case).

- [ ] If on the previous step a number (license size) were obtained, it should be converted to one of buckets:

  1. - [x] 1-10: S
  1. - [x] 11-50: M
  1. - [x] 51-250: L
  1. - [x] 251-1250: XL
  1. - [x] 1251-6250: 2XL
  1. - [x] 6251+ or Unlimited: 3XL

- [ ] The resulted value should replace the original tier and returned as response.
