/* eslint-disable consistent-return */
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
    console.log(`${API_ENDPOINT}/campaigns`);
    return axios
      .post(`${API_ENDPOINT}/campaigns`, {
        clientCode,
        clientName,
        description,
        endDate,
        center,
        types,
        estimationCPM,
        estimationPrint,
        estimationTarget,
        facebookAds,
        facebookAdsPro,
        media,
        mobileAnnounce,
        setup,
        smsAnnounce,
        startDate,
        status,
        title: campaignTitle,
        total,
      })
      .then((response) => {
        if (response.status >= 200 || response.status <= 299) {
          return response.data;
        }
      })
      .catch((error) => error);
  }

  static async getCampaigns() {
    return axios
      .get(`${API_ENDPOINT}/campaigns`)
      .then((response) => {
        if (response.status >= 200 || response.status <= 299) {
          return response.data;
        }
      })
      .catch((error) => error);
  }

  static async getCampaignById(id) {
    return axios
      .get(`${API_ENDPOINT}/campaigns/${id}`)
      .then((response) => {
        if (response.status >= 200 || response.status <= 299) {
          return response.data;
        }
      })
      .catch((error) => error);
  }

  static async deleteMission(id) {
    return axios
      .delete(`${API_ENDPOINT}/campaigns/${id}`)
      .then((response) => {
        if (response.status >= 200 || response.status <= 299) {
          return response;
        }
      })
      .catch((error) => error);
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
        `${API_ENDPOINT}/campaigns/${id}`,
        {
          clientCode,
          clientName,
          description,
          endDate,
          center,
          types,
          estimationCPM,
          estimationPrint,
          estimationTarget,
          facebookAds,
          facebookAdsPro,
          media,
          mobileAnnounce,
          setup,
          smsAnnounce,
          startDate,
          status,
          title: campaignTitle,
          total,
        },
        config,
      )
      .then((response) => {
        if (response.status >= 200 || response.status <= 299) {
          return response.data;
        }
      })
      .catch((error) => error);
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
      .post(`${API_ENDPOINT}/campaign/real`, {
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
      .put(`${API_ENDPOINT}/campaign/real/${id}`, {
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
      .get(`${API_ENDPOINT}/campaigns/search`, { params: { search: name } })
      .then((response) => response)
      .catch((err) => {
        console.log(err);
        return err;
      });
  }

  static async getRealCampaign(id) {
    return axios
      .get(`${API_ENDPOINT}/campaign/real/${id}`)
      .then((response) => response.data)
      .catch((err) => err);
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
      .post(`${API_ENDPOINT}/campaign/billing`, {
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
      })
      .then((response) => response.data)
      .catch((err) => err);
  }

  static async getCampaignBilling(id) {
    return axios
      .get(`${API_ENDPOINT}/campaign/billing/${id}`)
      .then((response) => response.data)
      .catch((err) => err);
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
      .put(`${API_ENDPOINT}/campaign/billing/${id}`, {
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
      })
      .then((response) => response.data)
      .catch((err) => err);
  }

  static async getReport(id) {
    return axios
      .get(`${API_ENDPOINT}/export/campaigns/${id}`)
      .then((response) => {
        console.log(response);
        return response.data;
      })
      .catch((err) => err);
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
      .post(`${API_ENDPOINT}/validation`, {
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
      })
      .then((response) => response.data)
      .catch((err) => err);
  }

  static async getValidationById(id) {
    return axios
      .get(`${API_ENDPOINT}/validation/${id}`)
      .then((response) => response.data)
      .catch((err) => err);
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
      .put(`${API_ENDPOINT}/validation/${id}`, {
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
      })
      .then((response) => response.data)
      .catch((err) => err);
  }
}

export default ServiceManager;
