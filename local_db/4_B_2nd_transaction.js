module.exports = {
  _links: {
    self: {
      href:
        '/rest/2/vendors/27437/reporting/sales/transactions?addon=com.stiltsoft.confluence.handy.macros&text=SEN-9400972&sortBy=date&order=desc&limit=1',
    },
    query: {
      href:
        '/rest/2/vendors/27437/reporting/sales/transactions{?addon*,startDate,endDate,text,tier*,saleType*,partnerType*,hosting*,lastUpdated,sortBy,order,offset,limit}',
      templated: true,
    },
    export: [
      {
        href:
          '/rest/2/vendors/27437/reporting/sales/transactions/export?accept=csv&addon=com.stiltsoft.confluence.handy.macros&text=SEN-9400972&sortBy=date&order=desc',
        type: 'text/csv',
      },
      {
        href:
          '/rest/2/vendors/27437/reporting/sales/transactions/export?accept=json&addon=com.stiltsoft.confluence.handy.macros&text=SEN-9400972&sortBy=date&order=desc',
        type: 'application/json',
      },
    ],
  },
  transactions: [
    {
      transactionId: 'AT-132775705',
      addonLicenseId: '20897526',
      hostLicenseId: '9400972',
      licenseId: 'SEN-9400972',
      addonKey: 'com.stiltsoft.confluence.handy.macros',
      addonName: 'Handy Macros for Confluence',
      lastUpdated: '2021-03-30',
      customerDetails: {
        company: 'XXXXXXXXXXXXXXXXXXXXXXX',
        country: 'XXXXXXXXXXXXXXXXXXXXXXX',
        region: 'XXXXXXXXXXXXXXXXXXXXXXX',
        technicalContact: {
          email: 'XXXXXXXXXXXXXXXXXXXXXXX',
          name: 'XXXXXXXXXXXXXXXXXXXXXXX',
        },
        billingContact: {
          email: 'XXXXXXXXXXXXXXXXXXXXXXX',
          name: 'XXXXXXXXXXXXXXXXXXXXXXX',
        },
      },
      purchaseDetails: {
        saleDate: '2021-03-28',
        tier: 'Per Unit Pricing (10 users)',
        licenseType: 'COMMERCIAL',
        hosting: 'Cloud',
        billingPeriod: 'Monthly',
        purchasePrice: 1.0,
        vendorAmount: 0.949999988079071,
        saleType: 'New',
        maintenanceStartDate: '2021-03-28',
        maintenanceEndDate: '2021-04-28',
      },
    },
  ],
};
