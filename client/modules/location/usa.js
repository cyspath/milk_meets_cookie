'use strict';
import allCitys from './usa_data';

exports.query = function (state) {
    var cityList = allCitys;

    if (state) {
      for (var i = 0; i < allCitys.length; i++) {
        if (allCitys[i].name == state) {
          return allCitys[i].children;
        }
      }
    } else {
      return allCitys.map((s) => { return s.name });
    }
};

exports.provinces = allCitys;
