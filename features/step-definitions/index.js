var {defineSupportCode} = require('cucumber');
var {expect} = require('chai');

defineSupportCode(({Given, When, Then}) => {
  Given('I go to habitica home screen', () => {
    browser.url('/');

  });
  When('I open the login screen', () => {
     $('a[href="/login"]').waitForExist(5000);
     $('a[href="/login"]').waitForDisplayed(5000);
     $('a[href="/login"]').click();
  });
  When('I try to login', () => {
    var cajaLogIn = $('#login-form');
    cajaLogIn.$('button=Login').click();
  });
  When('I try to register', () => {
      var cajaSignUp = $('.cajaSignUp');
      cajaSignUp.$('button=Registrarse').click()
  });
  When('I check my program', () => {
      var cajaSignUp = $('.cajaSignUp');
      var universityInput = cajaSignUp.$('select[name="idUniversidad"]');
      var programCheckbox=cajaSignUp.$('input[type=checkbox]');
      console.log("Valor del checkbox: ",programCheckbox);
      programCheckbox.click();
      var program=cajaSignUp.$('select[name="idPrograma"]');
      program.waitForDisplayed(2000);
      program.click();
      program.waitForDisplayed(2000);
      console.log("programHTML: ",program.getHTML());
      console.log("programValue: ",program.getValue());
      program.selectByAttribute('value', "16");
      console.log("programValueNext: ",program.getValue());
      expect(program.getValue()).to.eq("16");
  });
  When('I accept terms', () => {
      var cajaSignUp = $('.cajaSignUp');
      var acceptCheckbox=cajaSignUp.$('input[name=acepta]');
      acceptCheckbox.click();
  });
  Then('I expect to not be able to login', () => {
    var aviso = $('.aviso.alert.alert-danger').waitForDisplayed(5000);
  });
  When(/^I fill with (.*) and (.*)$/ , (email, password) => {
      var cajaLogIn = $('#login-form');
      var mailInput = cajaLogIn.$('input[id="usernameInput"]');
      mailInput.click();
      mailInput.keys(email);

      var passwordInput = cajaLogIn.$('input[name="passwordInput"]');
      passwordInput.click();
      passwordInput.keys(password)
  });
  When(/^I register with (.*) and (.*) and (.*) and (.*)$/, (name, lastName, email, password) => {
        var cajaSignUp = $('.cajaSignUp');

        //browser.waitForVisible('.cajaLogIn', 5000);
        if(cajaSignUp.isDisplayed()){
          console.log("Entra a llenar form");
          //var cajaSignUp = $('.cajaSignUp');
          var nameInput = cajaSignUp.$('input[name="nombre"]');
          var lastNameInput = cajaSignUp.$('input[name="apellido"]');
          var mailInput = cajaSignUp.$('input[name="correo"]');
          nameInput.click();
          nameInput.keys(name);
          lastNameInput.click();
          lastNameInput.keys(lastName);
          mailInput.click();
          mailInput.keys(email);
          var passwordInput = cajaSignUp.$('input[name="password"]');
          passwordInput.click();
          passwordInput.keys(password);
        }
  });


  Then('I expect to see {string}', error => {
        var aviso=$('.error[data-v-1d3681ba]');
        aviso.waitForExist(5000);
        aviso.waitForDisplayed(5000);
        var alertText = aviso.getText();
        expect(alertText).to.include(error);
  });

  Then('I dont expect to see Ingresar', () => {
        browser.url('/');
        if(!$('button=Ingresar').isDisplayed()) {
          console.log("Login success");
          var cuenta=$('button[id=cuenta]');
          cuenta.click();
          browser.element("a=Salir").click();
        }
  });

  Then('I expect to login', () => {
    var cuenta=$('#cuenta').waitForDisplayed(5000);
    expect($('#cuenta').isDisplayed()).to.be.true;
  });

});
