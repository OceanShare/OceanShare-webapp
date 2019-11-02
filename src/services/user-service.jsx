import axios from 'axios';

const API_ENDPOINT = 'http://localhost:5000';

class ServiceManager {
  //
  // Campaign management
  //
  static async CreateCampaign(
    clientName,
    campaignTitle,
    clientCode,
    center,
    types,
    startDate,
    endDate,
    facebookAds,
    mobileAnnounce,
    smsAnnounce,
    facebookAdsPro,
    description,
    setup,
    media,
    total,
    estimationPrint,
    estimationTarget,
    estimationCPM,
    status,
  ) {
    console.log(API_ENDPOINT + '/campaigns');
    return axios
      .post(API_ENDPOINT + '/campaigns', {
        clientCode: clientCode,
        clientName: clientName,
        description: description,
        endDate: endDate,
        center: center,
        types: types,
        estimationCPM: estimationCPM,
        estimationPrint: estimationPrint,
        estimationTarget: estimationTarget,
        facebookAds: facebookAds,
        facebookAdsPro: facebookAdsPro,
        media: media,
        mobileAnnounce: mobileAnnounce,
        setup: setup,
        smsAnnounce: smsAnnounce,
        startDate: startDate,
        status: status,
        title: campaignTitle,
        total: total,
      })
      .then((response) => {
        if (response.status >= 200 || response.status <= 299) {
          return response.data;
        }
      })
      .catch((error) => {
        return error;
      });
  }

  static async getCampaigns() {
    return axios
      .get(API_ENDPOINT + '/campaigns')
      .then((response) => {
        if (response.status >= 200 || response.status <= 299) {
          return response.data;
        }
      })
      .catch((error) => {
        return error;
      });
  }

  static async getCampaignById(id) {
    return axios
      .get(API_ENDPOINT + `/campaigns/${id}`)
      .then((response) => {
        if (response.status >= 200 || response.status <= 299) {
          return response.data;
        }
      })
      .catch((error) => {
        return error;
      });
  }

  static async deleteMission(id) {
    return axios
      .delete(API_ENDPOINT + `/campaigns/${id}`)
      .then((response) => {
        if (response.status >= 200 || response.status <= 299) {
          return response;
        }
      })
      .catch((error) => {
        return error;
      });
  }

  static async UpdateCampaign(
    id,
    clientName,
    campaignTitle,
    clientCode,
    center,
    types,
    startDate,
    endDate,
    facebookAds,
    mobileAnnounce,
    smsAnnounce,
    facebookAdsPro,
    description,
    setup,
    media,
    total,
    estimationPrint,
    estimationTarget,
    estimationCPM,
    status,
  ) {
    const config = { headers: { 'Content-Type': 'application/json' } };
    console.log(
      '========================================\n',
      id,
      '\n===============================================\n',
    );
    return axios
      .put(
        API_ENDPOINT + `/campaigns/${id}`,
        {
          clientCode: clientCode,
          clientName: clientName,
          description: description,
          endDate: endDate,
          center: center,
          types: types,
          estimationCPM: estimationCPM,
          estimationPrint: estimationPrint,
          estimationTarget: estimationTarget,
          facebookAds: facebookAds,
          facebookAdsPro: facebookAdsPro,
          media: media,
          mobileAnnounce: mobileAnnounce,
          setup: setup,
          smsAnnounce: smsAnnounce,
          startDate: startDate,
          status: status,
          title: campaignTitle,
          total: total,
        },
        config,
      )
      .then((response) => {
        if (response.status >= 200 || response.status <= 299) {
          return response.data;
        }
      })
      .catch((error) => {
        return error;
      });
  }

  static async createRealCampaign(
    idCampaign,
    printDelivered,
    performances,
    range,
    clicks,
    percentClicks,
    investment,
    cpm,
    total,
    outstanding,
    visits,
  ) {
    return axios
      .post(API_ENDPOINT + '/campaign/real', {
        idCampaign: idCampaign,
        printDelivered: printDelivered,
        performances: performances,
        range: range,
        clicks: clicks,
        percentClicks: percentClicks,
        investment: investment,
        cpm: cpm,
        total: total,
        outstanding: outstanding,
        visits: visits,
      })
      .then((response) => {
        if (response.status >= 200 || response.status <= 299) {
          return response.data;
        }
        return response;
      })
      .catch((error) => {
        console.error(error);
        return error;
      });
  }

  static async updateRealCampaign(
    id,
    idCampaign,
    printDelivered,
    performances,
    range,
    clicks,
    percentClicks,
    investment,
    cpm,
    total,
    outstanding,
    visits,
  ) {
    return axios
      .put(API_ENDPOINT + '/campaign/real/' + id, {
        idCampaign: idCampaign,
        printDelivered: printDelivered,
        performances: performances,
        range: range,
        clicks: clicks,
        percentClicks: percentClicks,
        investment: investment,
        cpm: cpm,
        total: total,
        outstanding: outstanding,
        visits: visits,
      })
      .then((response) => {
        if (response.status >= 200 || response.status <= 299) {
          return response.data;
        }
        return response;
      })
      .catch((error) => {
        console.error(error);
        return error;
      });
  }

  static async getCampaignByName(name) {
    return axios
      .get(API_ENDPOINT + '/campaigns/search', { params: { search: name } })
      .then((response) => {
        return response;
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  }

  static async getRealCampaign(id) {
    return axios
      .get(API_ENDPOINT + `/campaign/real/${id}`)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        return err;
      });
  }

  static async createCampaignBilling(
    idCampaign,
    mediaInvest,
    nameFRS,
    amount,
    numberCart,
    budgetMedia,
    budgetToPay,
    billNumber,
    budgetToPay2,
    billNumber2,
    bridge,
    outstanding,
    cartPlaceloop,
    amountPlaceloop,
    billPlaceloop,
    amountBillPlaceloop,
  ) {
    return axios
      .post(API_ENDPOINT + `/campaign/billing`, {
        idCampaign: idCampaign,
        mediaInvest: mediaInvest,
        nameFRS: nameFRS,
        amount: amount,
        numberCart: numberCart,
        budgetMedia: budgetMedia,
        budgetToPay: budgetToPay,
        billNumber: billNumber,
        budgetToPay2: budgetToPay2,
        billNumber2: billNumber2,
        bridge: bridge,
        outstanding: outstanding,
        cartPlaceloop: cartPlaceloop,
        amountPlaceloop: amountPlaceloop,
        billPlaceloop: billPlaceloop,
        amountBillPlaceloop: amountBillPlaceloop,
      })
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        return err;
      });
  }

  static async getCampaignBilling(id) {
    return axios
      .get(API_ENDPOINT + `/campaign/billing/${id}`)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        return err;
      });
  }

  static async updateCampaignBilling(
    id,
    idCampaign,
    mediaInvest,
    nameFRS,
    amount,
    numberCart,
    budgetMedia,
    budgetToPay,
    billNumber,
    budgetToPay2,
    billNumber2,
    bridge,
    outstanding,
    cartPlaceloop,
    amountPlaceloop,
    billPlaceloop,
    amountBillPlaceloop,
  ) {
    return axios
      .put(API_ENDPOINT + `/campaign/billing/${id}`, {
        idCampaign: idCampaign,
        mediaInvest: mediaInvest,
        nameFRS: nameFRS,
        amount: amount,
        numberCart: numberCart,
        budgetMedia: budgetMedia,
        budgetToPay: budgetToPay,
        billNumber: billNumber,
        budgetToPay2: budgetToPay2,
        billNumber2: billNumber2,
        bridge: bridge,
        outstanding: outstanding,
        cartPlaceloop: cartPlaceloop,
        amountPlaceloop: amountPlaceloop,
        billPlaceloop: billPlaceloop,
        amountBillPlaceloop: amountBillPlaceloop,
      })
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        return err;
      });
  }

  static async getReport(id) {
    return axios
      .get(API_ENDPOINT + `/export/campaigns/${id}`)
      .then((response) => {
        console.log(response);
        return response.data;
      })
      .catch((err) => {
        return err;
      });
  }

  static async createValidation(
    idCampaign,
    center,
    bestTime,
    startingBestTime,
    levy,
    levyFormat,
    provider,
    broadcastDate,
    campaignSettings,
    budget,
    volum,
    receptionValidation,
    smsTextValide,
    content,
    description,
    invoicePlaceloop,
    reporting,
  ) {
    return axios
      .post(API_ENDPOINT + '/validation', {
        idCampaign: idCampaign,
        center: center,
        bestTime: bestTime,
        startingBestTime: startingBestTime,
        levy: levy,
        levyFormat: levyFormat,
        provider: provider,
        broadcastDate: broadcastDate,
        campaignSettings: campaignSettings,
        budget: budget,
        volum: volum,
        receptionValidation: receptionValidation,
        smsTextValide: smsTextValide,
        content: content,
        description: description,
        invoicePlaceloop: invoicePlaceloop,
        reporting: reporting,
      })
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        return err;
      });
  }

  static async getValidationById(id) {
    return axios
      .get(API_ENDPOINT + '/validation/' + id)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        return err;
      });
  }

  static async updateValidation(
    id,
    idCampaign,
    center,
    bestTime,
    startingBestTime,
    levy,
    levyFormat,
    provider,
    broadcastDate,
    campaignSettings,
    budget,
    volum,
    receptionValidation,
    smsTextValide,
    content,
    description,
    invoicePlaceloop,
    reporting,
  ) {
    return axios
      .put(API_ENDPOINT + `/validation/${id}`, {
        idCampaign: idCampaign,
        center: center,
        bestTime: bestTime,
        startingBestTime: startingBestTime,
        levy: levy,
        levyFormat: levyFormat,
        provider: provider,
        broadcastDate: broadcastDate,
        campaignSettings: campaignSettings,
        budget: budget,
        volum: volum,
        receptionValidation: receptionValidation,
        smsTextValide: smsTextValide,
        content: content,
        description: description,
        invoicePlaceloop: invoicePlaceloop,
        reporting: reporting,
      })
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        return err;
      });
  }
}

export default ServiceManager;
