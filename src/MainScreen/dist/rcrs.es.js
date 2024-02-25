import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';

var CountryRegionData = [

  {
    "countryName": "United States",
    "countryShortCode": "US",
    "regions": [
      {
        "name": "Alabama",
        "shortCode": "AL"
      },
      {
        "name": "Alaska",
        "shortCode": "AK"
      },
      {
        "name": "American Samoa",
        "shortCode": "AS"
      },
      {
        "name": "Arizona",
        "shortCode": "AZ"
      },
      {
        "name": "Arkansas",
        "shortCode": "AR"
      },
      {
        "name": "California",
        "shortCode": "CA"
      },
      {
        "name": "Colorado",
        "shortCode": "CO"
      },
      {
        "name": "Connecticut",
        "shortCode": "CT"
      },
      {
        "name": "Delaware",
        "shortCode": "DE"
      },
      {
        "name": "District of Columbia",
        "shortCode": "DC"
      },
      {
        "name": "Micronesia",
        "shortCode": "FM"
      },
      {
        "name": "Florida",
        "shortCode": "FL"
      },
      {
        "name": "Georgia",
        "shortCode": "GA"
      },
      {
        "name": "Guam",
        "shortCode": "GU"
      },
      {
        "name": "Hawaii",
        "shortCode": "HI"
      },
      {
        "name": "Idaho",
        "shortCode": "ID"
      },
      {
        "name": "Illinois",
        "shortCode": "IL"
      },
      {
        "name": "Indiana",
        "shortCode": "IN"
      },
      {
        "name": "Iowa",
        "shortCode": "IA"
      },
      {
        "name": "Kansas",
        "shortCode": "KS"
      },
      {
        "name": "Kentucky",
        "shortCode": "KY"
      },
      {
        "name": "Louisiana",
        "shortCode": "LA"
      },
      {
        "name": "Maine",
        "shortCode": "ME"
      },
      {
        "name": "Marshall Islands",
        "shortCode": "MH"
      },
      {
        "name": "Maryland",
        "shortCode": "MD"
      },
      {
        "name": "Massachusetts",
        "shortCode": "MA"
      },
      {
        "name": "Michigan",
        "shortCode": "MI"
      },
      {
        "name": "Minnesota",
        "shortCode": "MN"
      },
      {
        "name": "Mississippi",
        "shortCode": "MS"
      },
      {
        "name": "Missouri",
        "shortCode": "MO"
      },
      {
        "name": "Montana",
        "shortCode": "MT"
      },
      {
        "name": "Nebraska",
        "shortCode": "NE"
      },
      {
        "name": "Nevada",
        "shortCode": "NV"
      },
      {
        "name": "New Hampshire",
        "shortCode": "NH"
      },
      {
        "name": "New Jersey",
        "shortCode": "NJ"
      },
      {
        "name": "New Mexico",
        "shortCode": "NM"
      },
      {
        "name": "New York",
        "shortCode": "NY"
      },
      {
        "name": "North Carolina",
        "shortCode": "NC"
      },
      {
        "name": "North Dakota",
        "shortCode": "ND"
      },
      {
        "name": "Northern Mariana Islands",
        "shortCode": "MP"
      },
      {
        "name": "Ohio",
        "shortCode": "OH"
      },
      {
        "name": "Oklahoma",
        "shortCode": "OK"
      },
      {
        "name": "Oregon",
        "shortCode": "OR"
      },
      {
        "name": "Palau",
        "shortCode": "PW"
      },
      {
        "name": "Pennsylvania",
        "shortCode": "PA"
      },
      {
        "name": "Puerto Rico",
        "shortCode": "PR"
      },
      {
        "name": "Rhode Island",
        "shortCode": "RI"
      },
      {
        "name": "South Carolina",
        "shortCode": "SC"
      },
      {
        "name": "South Dakota",
        "shortCode": "SD"
      },
      {
        "name": "Tennessee",
        "shortCode": "TN"
      },
      {
        "name": "Texas",
        "shortCode": "TX"
      },
      {
        "name": "Utah",
        "shortCode": "UT"
      },
      {
        "name": "Vermont",
        "shortCode": "VT"
      },
      {
        "name": "Virgin Islands",
        "shortCode": "VI"
      },
      {
        "name": "Virginia",
        "shortCode": "VA"
      },
      {
        "name": "Washington",
        "shortCode": "WA"
      },
      {
        "name": "West Virginia",
        "shortCode": "WV"
      },
      {
        "name": "Wisconsin",
        "shortCode": "WI"
      },
      {
        "name": "Wyoming",
        "shortCode": "WY"
      },
      {
        "name": "Armed Forces Americas",
        "shortCode": "AA"
      },
      {
        "name": "Armed Forces Europe, Canada, Africa and Middle East",
        "shortCode": "AE"
      },
      {
        "name": "Armed Forces Pacific",
        "shortCode": "AP"
      }
    ]
  },
  {
    "countryName": "United States Minor Outlying Islands",
    "countryShortCode": "UM",
    "regions": [
      {
        "name": "Baker Island",
        "shortCode": "81"
      },
      {
        "name": "Howland Island",
        "shortCode": "84"
      },
      {
        "name": "Jarvis Island",
        "shortCode": "86"
      },
      {
        "name": "Johnston Atoll",
        "shortCode": "67"
      },
      {
        "name": "Kingman Reef",
        "shortCode": "89"
      },
      {
        "name": "Midway Islands",
        "shortCode": "71"
      },
      {
        "name": "Navassa Island",
        "shortCode": "76"
      },
      {
        "name": "Palmyra Atoll",
        "shortCode": "95"
      },
      {
        "name": "Wake Island",
        "shortCode": "79"
      },
      {
        "name": "Bajo Nuevo Bank",
        "shortCode": "BN"
      },
      {
        "name": "Serranilla Bank",
        "shortCode": "SB"
      }
    ]
  },
  {
    "countryName": "Lebanon",
    "countryShortCode": "LB",
    "regions": [
      {
        "name": "Aakkâr",
        "shortCode": "AK"
      },
      {
        "name": "Baalbelk-Hermel",
        "shortCode": "BH"
      },
      {
        "name": "Béqaa",
        "shortCode": "BI"
      },
      {
        "name": "Beyrouth",
        "shortCode": "BA"
      },
      {
        "name": "Liban-Nord",
        "shortCode": "AS"
      },
      {
        "name": "Liban-Sud",
        "shortCode": "JA"
      },
      {
        "name": "Mont-Liban",
        "shortCode": "JL"
      },
      {
        "name": "Nabatîyé",
        "shortCode": "NA"
      }
    ]
  },
  {
    "countryName": "Canada",
    "countryShortCode": "CA",
    "regions": [
      {
        "name": "Alberta",
        "shortCode": "AB"
      },
      {
        "name": "British Columbia",
        "shortCode": "BC"
      },
      {
        "name": "Manitoba",
        "shortCode": "MB"
      },
      {
        "name": "New Brunswick",
        "shortCode": "NB"
      },
      {
        "name": "Newfoundland and Labrador",
        "shortCode": "NL"
      },
      {
        "name": "Northwest Territories",
        "shortCode": "NT"
      },
      {
        "name": "Nova Scotia",
        "shortCode": "NS"
      },
      {
        "name": "Nunavut",
        "shortCode": "NU"
      },
      {
        "name": "Ontario",
        "shortCode": "ON"
      },
      {
        "name": "Prince Edward Island",
        "shortCode": "PE"
      },
      {
        "name": "Quebec",
        "shortCode": "QC"
      },
      {
        "name": "Saskatchewan",
        "shortCode": "SK"
      },
      {
        "name": "Yukon",
        "shortCode": "YT"
      }
    ]
  },
  {
    "countryName": "Palestine, State of",
    "countryShortCode": "PS",
    "regions": [
      {
        "name": "Ak Khalīl",
        "shortCode": "HBN"
      },
      {
        "name": "Al Quds",
        "shortCode": "JEM"
      },
      {
        "name": "Arīḩā wal Aghwār",
        "shortCode": "JRH"
      },
      {
        "name": "Bayt Laḩm",
        "shortCode": "BTH"
      },
      {
        "name": "Dayr al Balaḩ",
        "shortCode": "DEB"
      },
      {
        "name": "Ghazzah",
        "shortCode": "GZA"
      },
      {
        "name": "Janīn",
        "shortCode": "JEN"
      },
      {
        "name": "Khān Yūnis",
        "shortCode": "KYS"
      },
      {
        "name": "Nāblus",
        "shortCode": "NBS"
      },
      {
        "name": "Qalqīyah",
        "shortCode": "QQA"
      },
      {
        "name": "Rafaḩ",
        "shortCode": "RFH"
      },
      {
        "name": "Rām Allāh wal Bīrah",
        "shortCode": "RBH"
      },
      {
        "name": "Salfīt",
        "shortCode": "SLT"
      },
      {
        "name": "Shamāl Ghazzah",
        "shortCode": "NGZ"
      },
      {
        "name": "Ţūbās",
        "shortCode": "TBS"
      },
      {
        "name": "Ţūlkarm",
        "shortCode": "TKM"
      }
    ]
  },
  {
    "countryName": "France",
    "countryShortCode": "FR",
    "regions": [
      {
        "name": "Auvergne-Rhône-Alpes",
        "shortCode": "ARA"
      },
      {
        "name": "Bourgogne-Franche-Comté",
        "shortCode": "BFC"
      },
      {
        "name": "Bretagne",
        "shortCode": "BRE"
      },
      {
        "name": "Centre-Val de Loire",
        "shortCode": "CVL"
      },
      {
        "name": "Corse",
        "shortCode": "COR"
      },
      {
        "name": "Grand Est",
        "shortCode": "GES"
      },
      {
        "name": "Hauts-de-France",
        "shortCode": "HDF"
      },
      {
        "name": "Île-de-France",
        "shortCode": "IDF"
      },
      {
        "name": "Normandie",
        "shortCode": "NOR"
      },
      {
        "name": "Nouvelle-Aquitaine",
        "shortCode": "NAQ"
      },
      {
        "name": "Occitanie",
        "shortCode": "OCC"
      },
      {
        "name": "Pays de la Loire",
        "shortCode": "PDL"
      },
      {
        "name": "Provence-Alpes-Cote d'Azur",
        "shortCode": "PAC"
      },
      {
        "name": "Clipperton",
        "shortCode": "CP"
      },
      {
        "name": "Guadeloupe",
        "shortCode": "GP"
      },
      {
        "name": "Guyane",
        "shortCode": "GF"
      },
      {
        "name": "Martinique",
        "shortCode": "MQ"
      },
      {
        "name": "Mayotte",
        "shortCode": "YT"
      },
      {
        "name": "Nouvelle-Calédonie",
        "shortCode": "NC"
      },
      {
        "name": "Polynésie",
        "shortCode": "PF"
      },
      {
        "name": "Saint-Pierre-et-Miquelon",
        "shortCode": "PM"
      },
      {
        "name": "Saint Barthélemy",
        "shortCode": "BL"
      },
      {
        "name": "Saint Martin",
        "shortCode": "MF"
      },
      {
        "name": "Réunion",
        "shortCode": "RE"
      },
      {
        "name": "Terres Australes Françaises",
        "shortCode": "TF"
      },
      {
        "name": "Wallis-et-Futuna",
        "shortCode": "WF"
      }
    ]
  },
  {
    "countryName": "Qatar",
    "countryShortCode": "QA",
    "regions": [
      {
        "name": "Ad Dawḩah",
        "shortCode": "DA"
      },
      {
        "name": "Al Khawr wa adh Dhakhīrah",
        "shortCode": "KH"
      },
      {
        "name": "Al Wakrah",
        "shortCode": "WA"
      },
      {
        "name": "Ar Rayyān",
        "shortCode": "RA"
      },
      {
        "name": "Ash Shamāl",
        "shortCode": "MS"
      },
      {
        "name": "Az̧ Za̧`āyin",
        "shortCode": "ZA"
      },
      {
        "name": "Umm Şalāl",
        "shortCode": "US"
      }
    ]
  },
  ]
;

var C = {
	DISPLAY_TYPE_FULL: 'full',
	DISPLAY_TYPE_SHORT: 'short',
	REGION_LIST_DELIMITER: '|',
	SINGLE_REGION_DELIMITER: '~'
};

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

var objectWithoutProperties = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

// reduces the subset of countries depending on whether the user specified a white/blacklist, and lists priority
// countries first
var filterCountries = function filterCountries(countries, priorityCountries, whitelist, blacklist) {
	var countriesListedFirst = [];
	var filteredCountries = countries;

	if (whitelist.length > 0) {
		filteredCountries = countries.filter(function (_ref) {
			var _ref2 = slicedToArray(_ref, 2),
			    countrySlug = _ref2[1];

			return whitelist.indexOf(countrySlug) > -1;
		});
	} else if (blacklist.length > 0) {
		filteredCountries = countries.filter(function (_ref3) {
			var _ref4 = slicedToArray(_ref3, 2),
			    countrySlug = _ref4[1];

			return blacklist.indexOf(countrySlug) === -1;
		});
	}

	if (priorityCountries.length > 0) {

		// ensure the countries are added in the order in which they are specified by the user
		priorityCountries.forEach(function (slug) {
			var result = filteredCountries.find(function (_ref5) {
				var _ref6 = slicedToArray(_ref5, 2),
				    countrySlug = _ref6[1];

				return countrySlug === slug;
			});
			if (result) {
				countriesListedFirst.push(result);
			}
		});

		filteredCountries = filteredCountries.filter(function (_ref7) {
			var _ref8 = slicedToArray(_ref7, 2),
			    countrySlug = _ref8[1];

			return priorityCountries.indexOf(countrySlug) === -1;
		});
	}

	return countriesListedFirst.length ? [].concat(countriesListedFirst, toConsumableArray(filteredCountries)) : filteredCountries;
};

// called when requesting new regions. It reduces the subset of regions depending on whether the user specifies
// a white/blacklist
var filterRegions = function filterRegions(regionsObject, whitelistObject, blacklistObject) {
	var _regionsObject = slicedToArray(regionsObject, 3),
	    country = _regionsObject[0],
	    countryCode = _regionsObject[1],
	    regions = _regionsObject[2];

	var whitelist = whitelistObject.hasOwnProperty(countryCode) ? whitelistObject[countryCode] : [];
	var blacklist = blacklistObject.hasOwnProperty(countryCode) ? blacklistObject[countryCode] : [];
	var filteredRegions = regions.split('|');

	if (whitelist.length > 0 && filteredRegions.length > 0) {
		filteredRegions = filteredRegions.filter(function (region) {
			for (var i = 0, n = whitelist.length; i < n; i++) {
				if (region.indexOf(whitelist[i]) > -1) {
					return true;
				}
			}
			return false;
		});
	} else if (blacklist.length > 0 && filteredRegions.length > 0) {
		filteredRegions = filteredRegions.filter(function (region) {
			for (var i = 0, n = blacklist.length; i < n; i++) {
				if (region.indexOf(blacklist[i]) > -1) {
					return false;
				}
			}

			return true;
		});
	}

	return [country, countryCode, filteredRegions.join(' | ')];
};

var CountryDropdown = function (_Component) {
	inherits(CountryDropdown, _Component);

	function CountryDropdown(props) {
		classCallCheck(this, CountryDropdown);

		var _this = possibleConstructorReturn(this, (CountryDropdown.__proto__ || Object.getPrototypeOf(CountryDropdown)).call(this, props));

		_this.state = {
			countries: filterCountries(CountryRegionData, props.priorityOptions, props.whitelist, props.blacklist)
		};
		return _this;
	}

	createClass(CountryDropdown, [{
		key: 'getCountries',
		value: function getCountries() {
			var _props = this.props,
			    valueType = _props.valueType,
			    labelType = _props.labelType;


			return this.state.countries.map(function (_ref) {
				var _ref2 = slicedToArray(_ref, 2),
				    countryName = _ref2[0],
				    countrySlug = _ref2[1];

				return React.createElement(
					'option',
					{ value: valueType === C.DISPLAY_TYPE_SHORT ? countrySlug : countryName, key: countrySlug },
					labelType === C.DISPLAY_TYPE_SHORT ? countrySlug : countryName
				);
			});
		}
	}, {
		key: 'getDefaultOption',
		value: function getDefaultOption() {
			var _props2 = this.props,
			    showDefaultOption = _props2.showDefaultOption,
			    defaultOptionLabel = _props2.defaultOptionLabel;

			if (!showDefaultOption) {
				return null;
			}
			return React.createElement(
				'option',
				{ value: '', key: 'default' },
				defaultOptionLabel
			);
		}
	}, {
		key: 'render',
		value: function render() {
			// unused properties deliberately added so arbitraryProps gets populated with anything else the user specifies
			var _props3 = this.props,
			    name = _props3.name,
			    id = _props3.id,
			    classes = _props3.classes,
			    value = _props3.value,
			    _onChange = _props3.onChange,
			    _onBlur = _props3.onBlur,
			    disabled = _props3.disabled,
			    showDefaultOption = _props3.showDefaultOption,
			    defaultOptionLabel = _props3.defaultOptionLabel,
			    labelType = _props3.labelType,
			    valueType = _props3.valueType,
			    whitelist = _props3.whitelist,
			    blacklist = _props3.blacklist,
			    customOptions = _props3.customOptions,
			    priorityOptions = _props3.priorityOptions,
			    arbitraryProps = objectWithoutProperties(_props3, ['name', 'id', 'classes', 'value', 'onChange', 'onBlur', 'disabled', 'showDefaultOption', 'defaultOptionLabel', 'labelType', 'valueType', 'whitelist', 'blacklist', 'customOptions', 'priorityOptions']);


			var attrs = _extends({}, arbitraryProps, {
				name: name,
				value: value,
				onChange: function onChange(e) {
					return _onChange(e.target.value, e);
				},
				onBlur: function onBlur(e) {
					return _onBlur(e.target.value, e);
				},
				disabled: disabled
			});
			if (id) {
				attrs.id = id;
			}
			if (classes) {
				attrs.className = classes;
			}

			return React.createElement(
				'select',
				attrs,
				this.getDefaultOption(),
				this.getCountries()
			);
		}
	}]);
	return CountryDropdown;
}(Component);


CountryDropdown.propTypes = {
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	name: PropTypes.string,
	id: PropTypes.string,
	classes: PropTypes.string,
	showDefaultOption: PropTypes.bool,
	defaultOptionLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	priorityOptions: PropTypes.array,
	onChange: PropTypes.func,
	onBlur: PropTypes.func,
	labelType: PropTypes.oneOf([C.DISPLAY_TYPE_FULL, C.DISPLAY_TYPE_SHORT]),
	valueType: PropTypes.oneOf([C.DISPLAY_TYPE_FULL, C.DISPLAY_TYPE_SHORT]),
	whitelist: PropTypes.array,
	blacklist: PropTypes.array,
	disabled: PropTypes.bool
};
CountryDropdown.defaultProps = {
	value: '',
	name: 'rcrs-country',
	id: '',
	classes: '',
	showDefaultOption: true,
	defaultOptionLabel: 'Select Country',
	priorityOptions: [],
	onChange: function onChange() {},
	onBlur: function onBlur() {},
	labelType: C.DISPLAY_TYPE_FULL,
	valueType: C.DISPLAY_TYPE_FULL,
	whitelist: [],
	blacklist: [],
	disabled: false
};

var RegionDropdown = function (_PureComponent) {
	inherits(RegionDropdown, _PureComponent);

	function RegionDropdown(props) {
		classCallCheck(this, RegionDropdown);

		var _this = possibleConstructorReturn(this, (RegionDropdown.__proto__ || Object.getPrototypeOf(RegionDropdown)).call(this, props));

		_this.state = {
			regions: _this.getRegions(props.country)
		};
		_this.getRegions = _this.getRegions.bind(_this);
		return _this;
	}

	createClass(RegionDropdown, [{
		key: 'componentDidUpdate',
		value: function componentDidUpdate(prevProps) {
			var country = this.props.country;

			if (country === prevProps.country) {
				return;
			}

			var defaultRegions = this.getRegions(country);

			this.setState({
				regions: [].concat(toConsumableArray(defaultRegions), toConsumableArray(this.getCustomOptions(defaultRegions)))
			});
		}
	}, {
		key: 'getCustomOptions',
		value: function getCustomOptions(regions) {
			var customOptions = this.props.customOptions;


			var duplicateRegions = this.getDuplicates(regions);

			if (duplicateRegions.length) {
				console.error('Error: Duplicate regions present: ' + duplicateRegions.toString() + '.\nThe above item(s) is/are already getting added to the region dropdown by the library.');
				return [];
			}

			return customOptions.map(function (option) {
				if (option) {
					return { regionName: option, regionShortCode: option };
				}
			});
		}
	}, {
		key: 'getDuplicates',
		value: function getDuplicates(regions) {
			var _props = this.props,
			    customOptions = _props.customOptions,
			    valueType = _props.valueType;

			var regionKey = valueType === C.DISPLAY_TYPE_FULL ? 'regionName' : 'regionShortCode';

			return regions.filter(function (region) {
				return customOptions.indexOf(region[regionKey]) !== -1;
			}).map(function (region) {
				return region[regionKey];
			});
		}
	}, {
		key: 'getRegions',
		value: function getRegions(country) {
			if (!country) {
				return [];
			}

			var _props2 = this.props,
			    countryValueType = _props2.countryValueType,
			    whitelist = _props2.whitelist,
			    blacklist = _props2.blacklist;

			var searchIndex = countryValueType === C.DISPLAY_TYPE_FULL ? 0 : 1;
			var regions = [];
			CountryRegionData.forEach(function (i) {
				if (i[searchIndex] === country) {
					regions = i;
				}
			});

			// this could happen if the user is managing the state of the region/country themselves and screws up passing
			// in a valid country
			if (!regions || regions.length === 0) {
				console.error('Error. Unknown country passed: ' + country + '. If you\'re passing a country shortcode, be sure to include countryValueType="short" on the RegionDropdown');
				return [];
			}

			var filteredRegions = filterRegions(regions, whitelist, blacklist);

			return filteredRegions[2].split(C.REGION_LIST_DELIMITER).map(function (regionPair) {
				var _regionPair$split = regionPair.split(C.SINGLE_REGION_DELIMITER),
				    _regionPair$split2 = slicedToArray(_regionPair$split, 2),
				    regionName = _regionPair$split2[0],
				    _regionPair$split2$ = _regionPair$split2[1],
				    regionShortCode = _regionPair$split2$ === undefined ? null : _regionPair$split2$;

				return { regionName: regionName, regionShortCode: regionShortCode };
			});
		}
	}, {
		key: 'getRegionList',
		value: function getRegionList() {
			var _props3 = this.props,
			    labelType = _props3.labelType,
			    valueType = _props3.valueType;

			return this.state.regions.map(function (_ref) {
				var regionName = _ref.regionName,
				    regionShortCode = _ref.regionShortCode;

				var label = labelType === C.DISPLAY_TYPE_FULL ? regionName : regionShortCode;
				var value = valueType === C.DISPLAY_TYPE_FULL ? regionName : regionShortCode;
				return React.createElement(
					'option',
					{ value: value, key: regionName },
					label
				);
			});
		}

		// there are two default options. The "blank" option which shows up when the user hasn't selected a country yet, and
		// a "default" option which shows

	}, {
		key: 'getDefaultOption',
		value: function getDefaultOption() {
			var _props4 = this.props,
			    blankOptionLabel = _props4.blankOptionLabel,
			    showDefaultOption = _props4.showDefaultOption,
			    defaultOptionLabel = _props4.defaultOptionLabel,
			    country = _props4.country;

			if (!country) {
				return React.createElement(
					'option',
					{ value: '' },
					blankOptionLabel
				);
			}
			if (showDefaultOption) {
				return React.createElement(
					'option',
					{ value: '' },
					defaultOptionLabel
				);
			}
			return null;
		}
	}, {
		key: 'render',
		value: function render() {
			var _props5 = this.props,
			    value = _props5.value,
			    country = _props5.country,
			    _onChange = _props5.onChange,
			    _onBlur = _props5.onBlur,
			    id = _props5.id,
			    name = _props5.name,
			    classes = _props5.classes,
			    disabled = _props5.disabled,
			    blankOptionLabel = _props5.blankOptionLabel,
			    showDefaultOption = _props5.showDefaultOption,
			    defaultOptionLabel = _props5.defaultOptionLabel,
			    labelType = _props5.labelType,
			    valueType = _props5.valueType,
			    countryValueType = _props5.countryValueType,
			    disableWhenEmpty = _props5.disableWhenEmpty,
			    customOptions = _props5.customOptions,
			    arbitraryProps = objectWithoutProperties(_props5, ['value', 'country', 'onChange', 'onBlur', 'id', 'name', 'classes', 'disabled', 'blankOptionLabel', 'showDefaultOption', 'defaultOptionLabel', 'labelType', 'valueType', 'countryValueType', 'disableWhenEmpty', 'customOptions']);


			var isDisabled = disabled || disableWhenEmpty && country === '';
			var attrs = _extends({}, arbitraryProps, {
				name: name,
				value: value,
				onChange: function onChange(e) {
					return _onChange(e.target.value, e);
				},
				onBlur: function onBlur(e) {
					return _onBlur(e.target.value, e);
				},
				disabled: isDisabled
			});
			if (id) {
				attrs.id = id;
			}
			if (classes) {
				attrs.className = classes;
			}

			return React.createElement(
				'select',
				attrs,
				this.getDefaultOption(),
				this.getRegionList()
			);
		}
	}]);
	return RegionDropdown;
}(PureComponent);


RegionDropdown.propTypes = {
	country: PropTypes.string,
	countryValueType: PropTypes.oneOf([C.DISPLAY_TYPE_FULL, C.DISPLAY_TYPE_SHORT]),
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	name: PropTypes.string,
	id: PropTypes.string,
	classes: PropTypes.string,
	blankOptionLabel: PropTypes.string,
	showDefaultOption: PropTypes.bool,
	defaultOptionLabel: PropTypes.string,
	onChange: PropTypes.func,
	onBlur: PropTypes.func,
	labelType: PropTypes.string,
	valueType: PropTypes.string,
	whitelist: PropTypes.object,
	blacklist: PropTypes.object,
	disabled: PropTypes.bool,
	disableWhenEmpty: PropTypes.bool,
	customOptions: PropTypes.array
};
RegionDropdown.defaultProps = {
	country: '',
	value: '',
	name: 'rcrs-region',
	id: '',
	classes: '',
	blankOptionLabel: '-',
	showDefaultOption: true,
	defaultOptionLabel: 'Select Region',
	onChange: function onChange() {},
	onBlur: function onBlur() {},
	countryValueType: C.DISPLAY_TYPE_FULL,
	labelType: C.DISPLAY_TYPE_FULL,
	valueType: C.DISPLAY_TYPE_FULL,
	whitelist: {},
	blacklist: {},
	disabled: false,
	disableWhenEmpty: false,
	customOptions: []
};

export { CountryDropdown, RegionDropdown, CountryRegionData };
//# sourceMappingURL=rcrs.es.js.map
