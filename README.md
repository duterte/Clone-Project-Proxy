### TASK

- [ ] Check auth of an incoming request. Every access attempt (both successful and not successful) should be logged (log params and username from provided credentials).

- [ ] Get all params from incoming requests.

  1. - [ ] Add param "withDataInsights=true" to parameters list (or replace it if already exists)
  2. - [ ] If param "tier" or "withAttribution" specified, stop work and return an error

- [ ] Execute request with these params to URL1. Result can include several returned licenses, all of them should be treated as described below. In case of more than 100 licenses found, stop work and return an error.

- [ ] Get value of "tier" field and determine license size.

  1. - [ ]It can include size already. Format "<Number> Users" (i.e. 100 Users or 2000 Users). Or sometimes "Unlimited Users". In this case additional lookup with URL2 is not needed. The number will be processed later.
  2. - [ ] "Evaluation" or "Demonstration License". Should check field "evaluationOpportunitySize". If this field contains decimal number (alternatively it can be empty or "NA" or "Unknown" or something else), use it. If there is no number, left tier untouched. No additional lookup needed.
  3. Subscription. This is the case when additional lookup with URL2 is needed.
  4. Execute request URL2?text=<licenseId>&addon=<addonKey>&sortBy=date&order=desc&limit=1 (to get the last transaction linked to this license).
  5. If something was returned, you need to doublecheck if licenseId in request and response are fully equal, because it's just a search by substring and it, theoretically, can return mismatched result.
  6. Get transactions/purchaseDetails/tier, it should be like "Per Unit Pricing (27 users)". Extracted number is the resulting license size.
  7. If attempt to get license size from URL2 was unsuccessful, then app should try to get decimal value from evaluationOpportunitySize field from URL1 response (as in the "Evaluation" case).

- [ ] If on the previous step a number (license size) were obtained, it should be converted to one of buckets:

  1. 1-10: S
  2. 11-50: M
  3. 51-250: L
  4. 251-1250: XL
  5. 1251-6250: 2XL
  6. 6251+ or Unlimited: 3XL

- [ ] The resulted value should replace the original tier and returned as response.
