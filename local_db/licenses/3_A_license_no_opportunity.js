module.exports = {
  _links: {
    self: {
      href:
        '/rest/2/vendors/27437/reporting/licenses?text=SEN-22049430&withDataInsights=true',
    },
    query: {
      href:
        '/rest/2/vendors/27437/reporting/licenses{?addon*,startDate,endDate,text,tier*,dateType,licenseType*,partnerType*,hosting*,status*,withAttribution,withDataInsights,lastUpdated,sortBy,order,offset,limit}',
      templated: true,
    },
    export: [
      {
        href:
          '/rest/2/vendors/27437/reporting/licenses/export?accept=csv&text=SEN-22049430&withDataInsights=true',
        type: 'text/csv',
      },
      {
        href:
          '/rest/2/vendors/27437/reporting/licenses/export?accept=json&text=SEN-22049430&withDataInsights=true',
        type: 'application/json',
      },
    ],
  },
  licenses: [
    {
      addonLicenseId: '22055821',
      hostLicenseId: '22049430',
      licenseId: 'SEN-22049430',
      addonKey: 'com.stiltsoft.confluence.plugin.tablefilter.tablefilter',
      addonName: 'Table Filter and Charts for Confluence',
      hosting: 'Cloud',
      lastUpdated: '2021-03-26',
      licenseType: 'EVALUATION',
      maintenanceStartDate: '2021-03-25',
      maintenanceEndDate: '2021-05-25',
      status: 'active',
      tier: 'Subscription',
      contactDetails: {
        company: 'XXXXXXXXXXXXXXXXXXXXXXX',
        country: 'XXXXXXXXXXXXXXXXXXXXXXX',
        region: 'XXXXXXXXXXXXXXXXXXXXXXX',
        technicalContact: {
          email: 'XXXXXXXXXXXXXXXXXXXXXXX',
          name: 'XXXXXXXXXXXXXXXXXXXXXXX',
          phone: 'XXXXXXXXXXXXXXXXXXXXXXX',
          address1: 'XXXXXXXXXXXXXXXXXXXXXXX',
          city: 'XXXXXXXXXXXXXXXXXXXXXXX',
          postcode: 'XXXXXXXXXXXXXXXXXXXXXXX',
        },
        billingContact: {
          email: 'XXXXXXXXXXXXXXXXXXXXXXX',
          name: 'XXXXXXXXXXXXXXXXXXXXXXX',
          phone: 'XXXXXXXXXXXXXXXXXXXXXXX',
          address1: 'XXXXXXXXXXXXXXXXXXXXXXX',
          city: 'XXXXXXXXXXXXXXXXXXXXXXX',
          postcode: 'XXXXXXXXXXXXXXXXXXXXXXX',
        },
      },
    },
  ],
};
