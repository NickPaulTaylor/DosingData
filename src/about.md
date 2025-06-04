---
layout: page.njk
permalink: /about/
---
## About Us

Welcome to the Dosing Data blog!

This is placeholder text for your About page. You can edit this content later using Decap CMS. Talk about the purpose of your site, who you are, etc

<!-- Zoho Marketing Automation Header Code -->
<meta content="width=device-width,initial-scale=1.0, maximum-scale=1.0, user-scalable=0" name="viewport">
<script type="text/javascript" src="https://ma.zoho.eu/js/optin.min.js" onload="setupSF('sf3z8be0439aa88f7d9d2e06629ed3cef8528f796b4ee3ea438a702efca5c732b4d5','ZCFORMVIEW',false,'light')"></script>
<script type="text/javascript">
	function runOnFormSubmit_sf3z8be0439aa88f7d9d2e06629ed3cef8528f796b4ee3ea438a702efca5c732b4d5(th){
		/*Before submit, if you want to trigger your event, "include your code here"*/
	};
</script>

<div class="newsletter-signup">
  <div class="newsletter-content">
    <h3>Get Monthly Insights</h3>
    <p>Join our community and never miss an update on the latest trends and research.</p>
    
    <!-- Zoho Success Message -->
    <div id="Zc_SignupSuccess" style="display:none;background-color: #d4edda; color: #155724; padding: 15px; border-radius: 6px; margin-bottom: 20px; border: 1px solid #c3e6cb;">
      ✓ Thank you for signing up! Please check your email to confirm your subscription.
    </div>
    
    <!-- Zoho Error Message -->
    <div style="display:none;background-color:#f8d7da;padding:15px; color:#721c24; border-radius: 6px; margin-bottom: 20px; border: 1px solid #f5c6cb;" id="errorMsgDiv">
      Please correct the marked field(s) below.
    </div>

    <!-- Clean Zoho Form -->
    <form method="POST" id="zcampaignOptinForm" action="https://lnba-zcmp.maillist-manage.eu/weboptin.zc" target="_zcSignup">
      
      <!-- Name Fields Side by Side -->
      <div class="name-fields-row">
        <div class="newsletter-field">
          <label for="firstname">First Name *</label>
          <input type="text" 
                 id="firstname"
                 name="FIRSTNAME" 
                 placeholder="Enter your first name" 
                 required 
                 maxlength="50"
                 class="newsletter-input">
          <span style="display:none" id="dt_FIRSTNAME">1,true,1,First Name,2</span>
        </div>

        <div class="newsletter-field">
          <label for="lastname">Last Name *</label>
          <input type="text" 
                 id="lastname"
                 name="LASTNAME" 
                 placeholder="Enter your last name" 
                 required 
                 maxlength="50"
                 class="newsletter-input">
          <span style="display:none" id="dt_LASTNAME">1,true,1,Last Name,2</span>
        </div>
      </div>

      <!-- Email Field (Full Width) -->
      <div class="newsletter-field">
        <label for="email">Email Address *</label>
        <input type="email" 
               id="email"
               name="CONTACT_EMAIL" 
               placeholder="Enter your email address" 
               required 
               maxlength="100"
               class="newsletter-input">
        <span style="display:none" id="dt_CONTACT_EMAIL">1,true,6,Lead Email,2</span>
      </div>

      <!-- reCAPTCHA -->
      <div class="recaptcha-container">
        <div style="width:302px;overflow:hidden;max-width:100%" class="recaptcha" id="recapDiv"></div>
        <input type="hidden" id="secretid" value="6LdNeDUUAAAAAG5l7cJfv1AA5OKLslkrOa_xXxLs">
      </div>

      <!-- Submit Button -->
      <button type="button" id="zcWebOptin" class="newsletter-submit-btn">
        Subscribe to Newsletter
      </button>

      <p class="newsletter-disclaimer">
        * Required fields. We respect your privacy. Unsubscribe at any time.
      </p>

      <!-- All Required Zoho Hidden Fields -->
      <input type="hidden" id="fieldBorder" value="">
      <input type="hidden" name="zc_trackCode" id="zc_trackCode" value="">
      <input type="hidden" name="viewFrom" id="viewFrom" value="URL_ACTION">
      <input type="hidden" id="submitType" name="submitType" value="optinCustomView">
      <input type="hidden" id="lD" name="lD" value="">
      <input type="hidden" name="emailReportId" id="emailReportId" value="">
      <input type="hidden" name="zx" id="cmpZuid" value="14ae56ce3a">
      <input type="hidden" name="zcvers" value="2.0">
      <input type="hidden" name="oldListIds" id="allCheckedListIds" value="">
      <input type="hidden" id="mode" name="mode" value="OptinCreateView">
      <input type="hidden" id="zcld" name="zcld" value="">
      <input type="hidden" id="zctd" name="zctd" value="132c70286be20159">
      <input type="hidden" id="document_domain" value="marketingplus.zoho.eu">
      <input type="hidden" id="zc_Url" value="lnba-zcmp.maillist-manage.eu">
      <input type="hidden" id="new_optin_response_in" value="0">
      <input type="hidden" id="duplicate_optin_response_in" value="0">
      <input type="hidden" id="zc_formIx" name="zc_formIx" value="3z8be0439aa88f7d9d2e06629ed3cef8528f796b4ee3ea438a702efca5c732b4d5">
      <input type="hidden" id="isCaptchaNeeded" value="true">
      <input type="hidden" id="superAdminCap" value="0">
      <img src="https://lnba-zcmp.maillist-manage.eu/images/spacer.gif" onload="referenceSetter(this)" id="refImage" style="display:none;">
    </form>
  </div>
</div>

<!-- Zoho Success Popup (Hidden) -->
<div id="zcOptinOverLay" style="display:none;text-align: center; background-color: rgba(0, 0, 0, 0.5); z-index: 100; position: fixed; width: 100%; top: 0px; left: 0px; height: 100vh;"></div>
<div id="zcOptinSuccessPopup" style="display:none;z-index: 9999;width: 90%; max-width: 500px; top: 50%; left: 50%; transform: translate(-50%, -50%); position: fixed; background-color: #FFFFFF;border: 1px solid #E6E6E6; box-shadow: 0 4px 20px rgba(0,0,0,0.15);padding: 35px; border-radius: 8px;">
  <span style="position: absolute;top: 10px;right: 15px;z-index:99999;cursor: pointer; font-size: 24px; color: #999;" id="closeSuccess">×</span>
  <div id="zcOptinSuccessPanel"></div>
</div>

<style>
.newsletter-signup {
  margin: 2rem 0;
  padding: 1.5rem;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 12px;
  border: 1px solid #dee2e6;
}

.newsletter-content h3 {
  margin-top: 0;
  margin-bottom: 0.5rem;
  color: var(--color-primary);
  font-size: 1.5rem;
}

.newsletter-content p {
  color: var(--color-text-light);
  margin-bottom: 1.25rem;
  font-size: 0.95rem;
}

.name-fields-row {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.name-fields-row .newsletter-field {
  flex: 1;
}

.newsletter-field {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}

.newsletter-field label {
  font-weight: 600;
  margin-bottom: 0.4rem;
  color: var(--color-text);
  font-size: 0.9rem;
}

.newsletter-input {
  padding: 0.75rem 1rem;
  border: 1px solid #ced4da;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  font-family: inherit;
}

.newsletter-input:focus {
  outline: none;
  border-color: var(--color-secondary);
  box-shadow: 0 0 0 3px rgba(58, 109, 149, 0.1);
}

.newsletter-input:invalid {
  border-color: #dc3545;
}

.recaptcha-container {
  margin: 1rem 0;
  display: flex;
  justify-content: center;
}

.newsletter-submit-btn {
  width: 100%;
  padding: 0.75rem 1.5rem;
  background-color: var(--color-secondary);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  margin-bottom: 1rem;
}

.newsletter-submit-btn:hover {
  background-color: var(--color-accent);
  transform: translateY(-1px);
}

.newsletter-submit-btn:active {
  transform: translateY(0);
}

.newsletter-disclaimer {
  font-size: 0.8rem;
  color: var(--color-text-light);
  margin: 0;
  text-align: center;
  line-height: 1.4;
}

/* Mobile responsive adjustments */
@media (max-width: 600px) {
  .newsletter-signup {
    padding: 1.5rem;
    margin: 1.5rem 0;
  }
  
  .name-fields-row {
    flex-direction: column;
    gap: 1rem;
  }
  
  .recaptcha-container {
    overflow-x: auto;
  }
}

/* Style the reCAPTCHA to match our design */
.recaptcha {
  margin: 0 auto;
}

/* Error state styling */
.newsletter-input.error {
  border-color: #dc3545;
  background-color: #fff5f5;
}

/* Success state styling */
.newsletter-input.success {
  border-color: #28a745;
  background-color: #f8fff9;
}
</style>