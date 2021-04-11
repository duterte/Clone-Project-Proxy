module.exports = {
  _links: {
    self: {
      href:
        '/rest/2/vendors/27437/reporting/licenses?text=SEN-9400972&withDataInsights=true',
    },
    query: {
      href:
        '/rest/2/vendors/27437/reporting/licenses{?addon*,startDate,endDate,text,tier*,dateType,licenseType*,partnerType*,hosting*,status*,withAttribution,withDataInsights,lastUpdated,sortBy,order,offset,limit}',
      templated: true,
    },
    export: [
      {
        href:
          '/rest/2/vendors/27437/reporting/licenses/export?accept=csv&text=SEN-9400972&withDataInsights=true',
        type: 'text/csv',
      },
      {
        href:
          '/rest/2/vendors/27437/reporting/licenses/export?accept=json&text=SEN-9400972&withDataInsights=true',
        type: 'application/json',
      },
    ],
  },
  licenses: [
    {
      addonLicenseId: '21097901',
      hostLicenseId: '9400972',
      licenseId: 'SEN-9400972',
      addonKey: 'com.stiltsoft.confluence.plugin.tablefilter.tablefilter',
      addonName: 'Table Filter and Charts for Confluence',
      hosting: 'Cloud',
      lastUpdated: '2021-03-08',
      licenseType: 'EVALUATION',
      maintenanceStartDate: '2021-02-07',
      maintenanceEndDate: '2021-03-28',
      status: 'inactive',
      tier: 'Subscription',
      contactDetails: {
        company: 'XXXXXXXXXXXXXXXXXXXXXXX',
        country: 'XXXXXXXXXXXXXXXXXXXXXXX',
        region: 'XXXXXXXXXXXXXXXXXXXXXXX',
        technicalContact: {
          email: 'XXXXXXXXXXXXXXXXXXXXXXX',
          name: 'XXXXXXXXXXXXXXXXXXXXXXX',
          address1: 'XXXXXXXXXXXXXXXXXXXXXXX',
          city: 'XXXXXXXXXXXXXXXXXXXXXXX',
          state: 'XXXXXXXXXXXXXXXXXXXXXXX',
        },
        billingContact: {
          email: 'XXXXXXXXXXXXXXXXXXXXXXX',
          name: 'XXXXXXXXXXXXXXXXXXXXXXX',
          address1: 'XXXXXXXXXXXXXXXXXXXXXXX',
          city: 'XXXXXXXXXXXXXXXXXXXXXXX',
          state: 'XXXXXXXXXXXXXXXXXXXXXXX',
        },
      },
      attribution: {
        channel: 'Atlassian',
      },
      evaluationOpportunitySize: '11',
    },
    {
      addonLicenseId: '20897526',
      hostLicenseId: '9400972',
      licenseId: 'SEN-9400972',
      addonKey: 'com.stiltsoft.confluence.handy.macros',
      addonName: 'Handy Macros for Confluence',
      hosting: 'Cloud',
      lastUpdated: '2021-03-29',
      licenseType: 'COMMERCIAL',
      maintenanceStartDate: '2021-01-28',
      maintenanceEndDate: '2021-04-28',
      status: 'active',
      tier: 'Subscription',
      contactDetails: {
        company: 'XXXXXXXXXXXXXXXXXXXXXXX',
        country: 'XXXXXXXXXXXXXXXXXXXXXXX',
        region: 'XXXXXXXXXXXXXXXXXXXXXXX',
        technicalContact: {
          email: 'XXXXXXXXXXXXXXXXXXXXXXX',
          name: 'XXXXXXXXXXXXXXXXXXXXXXX',
          address1: 'XXXXXXXXXXXXXXXXXXXXXXX',
          city: 'XXXXXXXXXXXXXXXXXXXXXXX',
          state: 'XXXXXXXXXXXXXXXXXXXXXXX',
        },
        billingContact: {
          email: 'XXXXXXXXXXXXXXXXXXXXXXX',
          name: 'XXXXXXXXXXXXXXXXXXXXXXX',
          address1: 'XXXXXXXXXXXXXXXXXXXXXXX',
          city: 'XXXXXXXXXXXXXXXXXXXXXXX',
          state: 'XXXXXXXXXXXXXXXXXXXXXXX',
        },
      },
      attribution: {
        channel: 'Organic search',
        referrerDomain: 'www.google.com',
      },
      evaluationOpportunitySize: 'NA',
      evaluationLicense: '20897526',
      daysToConvertEval: '0',
      evaluationStartDate: '2021-01-29',
      evaluationEndDate: '2021-03-28',
      evaluationSaleDate: '2021-03-28',
    },
  ],
};
