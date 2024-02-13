import * as core from "@actions/core";
import axios from "axios";

async function getToken() {
  try {
    const clientId = core.getInput("client_id", { required: true });
    const clientSecret = core.getInput("client_secret", {
      required: true,
    });
    const foundryInstance = core.getInput("foundry_instance", {
      required: true,
    });
    const scope = core.getInput("scope", { required: true });
    core.info(`🔑 Getting token for ${foundryInstance}`);
    const response = await axios.post(
      `https://${foundryInstance}/multipass/api/oauth2/token`,
      new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: "client_credentials",
        scope,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    core.info(`✅ Token received for ${foundryInstance}`);

    const token = response.data.access_token;
    core.setSecret(token); // Masks the token in the logs
    core.setOutput("access_token", token);
    core.exportVariable("FOUNDRY_ACCESS_TOKEN", token);
  } catch (error) {
    core.setFailed(`🔒 Failed to get token: ${error.message}`);
  }
}

getToken();
