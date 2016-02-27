(function() {

  GK = {}; // app global

  /*
  @str = a string
  give this a string and it will return you the same string only
  with a capital letter at the beginning

  ex: john becomes John
  */

  GK.capitalize = function(str) {
    if (!str) {
      return;
    }

    var preComp = str.split('');
    preComp[0] = preComp[0].toUpperCase();

    return preComp.join('');
  };

  /*
    @str = takes a string
    give it: my-attribute-name
    returns: myAttributeName
  */

  GK.dashesToCamelCase = function(str) {
    if (!str) return str;

    var spl = str.split('-');
    var newName = '';

    for (var j = 0, k = spl.length; j < k; j++) {
      // if it is not the first word then leave it alone
      if (j > 0) {
        spl[j] = GK.capitalize(spl[j]);
      }

      newName += spl[j];
    }

    return newName;
  };




  GK.convertSerializedArray = function(serializedArray) {
    // use this method to convert your form values into properly formatted key value pairs
    var form = {};

    // takes an object and remaps a dash delimited name to camel case
    function reformatObjAttrs(obj) {
      // if we get an array - remap the attributes
      var newObj = {};

      $.each(obj, function(i) {
        newObj[GK.dashesToCamelCase(i)] = obj[i];
      });

      return newObj;
    }

    $.each(serializedArray, function() {
      form[this.name] = this.value;
    });

    // return a properly formatted object
    return reformatObjAttrs(form);
  };

})();



// page error system ========================================
GK.ErrorSystem = function() {
  // privates
  this._errors = [];
  this._errorsDep = new Deps.Dependency;

  // public: get the array of errors
  this.getErrors = function getErrors() {
    this._errorsDep.depend();
    return this._errors;
  }

  // public: reset the error array
  this.resetErrors = function resetErrors() {
    this._errors = [];
    this._errorsDep.changed();
  };

  // public: set some error
  // errors are submitted as strings
  this.addError = function addError(e) {
    this._errors.push(new this._errorFactory(e));
    this._errorsDep.changed();
  }
};

GK.ErrorSystem.prototype = {
  _errorFactory: function(e) {
    this.message = e || 'There is an error on the page.';
  },
  hasErrors: function() {
    return this.getErrors().length !== 0;
  }
};

// end error system...
