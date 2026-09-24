/**
 * Built-in formats
 * 
 */

import ssf from 'ssf';
import type {
  FormatObject,
  CurrencyDefinition,
  DerivedCurrencyFormat,
  ColumnUnitSummary
} from '../types';
import { AUTO_FORMAT_CODE, applyColumnUnits, generateImplicitNumberFormat } from './autoFormatting';

// Other active ISO 4217 currencies display by code ("SAR 1,234"): many share a
// symbol ($, kr, ₨), and an unknown tag like 'sar0' used to fall through to ssf as garbage.
function isoCurrency(code: string, name: string): CurrencyDefinition {
  return {
    primaryCode: code,
    currencySymbol: `${code.toUpperCase()} `,
    displayName: `${code.toUpperCase()} - ${name}`,
    escapeCurrencySymbol: true
  };
}

export const SUPPORTED_CURRENCIES: CurrencyDefinition[] = [
  {
    primaryCode: 'usd',
    currencySymbol: '$',
    displayName: 'USD - United States Dollar'
  },
  {
    primaryCode: 'aud',
    currencySymbol: 'A$',
    displayName: 'AUD - Australian Dollar',
    escapeCurrencySymbol: true
  },
  {
    primaryCode: 'brl',
    currencySymbol: 'R$',
    displayName: 'BRL - Brazilian Real',
    escapeCurrencySymbol: true
  },
  {
    primaryCode: 'cad',
    currencySymbol: 'C$',
    displayName: 'CAD - Canadian Dollar',
    escapeCurrencySymbol: true
  },
  {
    primaryCode: 'cny',
    currencySymbol: '¥',
    displayName: 'CNY - Renminbi',
    escapeCurrencySymbol: true
  },
  {
    primaryCode: 'eur',
    currencySymbol: '€',
    displayName: 'EUR - Euro'
  },
  {
    primaryCode: 'gbp',
    currencySymbol: '£',
    displayName: 'GBP - Pound Sterling',
    escapeCurrencySymbol: true
  },
  {
    primaryCode: 'jpy',
    currencySymbol: '¥',
    displayName: 'JPY - Japanese Yen',
    escapeCurrencySymbol: true
  },
  {
    primaryCode: 'inr',
    currencySymbol: '₹',
    displayName: 'INR - Indian Rupee',
    escapeCurrencySymbol: true
  },
  {
    primaryCode: 'krw',
    currencySymbol: '₩',
    displayName: 'KRW - South Korean won',
    escapeCurrencySymbol: true
  },
  {
    primaryCode: 'ngn',
    currencySymbol: '₦',
    displayName: 'NGN - Nigerian Naira',
    escapeCurrencySymbol: true
  },
  {
    primaryCode: 'rub',
    currencySymbol: 'rub',
    displayName: 'RUB - Russian Ruble',
    escapeCurrencySymbol: true
  },
  {
    primaryCode: 'sek',
    currencySymbol: 'kr',
    displayName: 'SEK - Swedish Krona',
    escapeCurrencySymbol: true
  },
  isoCurrency('aed', 'United Arab Emirates Dirham'),
  isoCurrency('afn', 'Afghan Afghani'),
  isoCurrency('all', 'Albanian Lek'),
  isoCurrency('amd', 'Armenian Dram'),
  isoCurrency('ang', 'Netherlands Antillean Guilder'),
  isoCurrency('aoa', 'Angolan Kwanza'),
  isoCurrency('ars', 'Argentine Peso'),
  isoCurrency('awg', 'Aruban Florin'),
  isoCurrency('azn', 'Azerbaijani Manat'),
  isoCurrency('bam', 'Bosnia-Herzegovina Convertible Mark'),
  isoCurrency('bbd', 'Barbadian Dollar'),
  isoCurrency('bdt', 'Bangladeshi Taka'),
  isoCurrency('bgn', 'Bulgarian Lev'),
  isoCurrency('bhd', 'Bahraini Dinar'),
  isoCurrency('bif', 'Burundian Franc'),
  isoCurrency('bmd', 'Bermudan Dollar'),
  isoCurrency('bnd', 'Brunei Dollar'),
  isoCurrency('bob', 'Bolivian Boliviano'),
  isoCurrency('bsd', 'Bahamian Dollar'),
  isoCurrency('btn', 'Bhutanese Ngultrum'),
  isoCurrency('bwp', 'Botswanan Pula'),
  isoCurrency('byn', 'Belarusian Ruble'),
  isoCurrency('bzd', 'Belize Dollar'),
  isoCurrency('cdf', 'Congolese Franc'),
  isoCurrency('chf', 'Swiss Franc'),
  isoCurrency('clp', 'Chilean Peso'),
  isoCurrency('cop', 'Colombian Peso'),
  isoCurrency('crc', 'Costa Rican Colón'),
  isoCurrency('cup', 'Cuban Peso'),
  isoCurrency('cve', 'Cape Verdean Escudo'),
  isoCurrency('czk', 'Czech Koruna'),
  isoCurrency('djf', 'Djiboutian Franc'),
  isoCurrency('dkk', 'Danish Krone'),
  isoCurrency('dop', 'Dominican Peso'),
  isoCurrency('dzd', 'Algerian Dinar'),
  isoCurrency('egp', 'Egyptian Pound'),
  isoCurrency('ern', 'Eritrean Nakfa'),
  isoCurrency('etb', 'Ethiopian Birr'),
  isoCurrency('fjd', 'Fijian Dollar'),
  isoCurrency('fkp', 'Falkland Islands Pound'),
  isoCurrency('gel', 'Georgian Lari'),
  isoCurrency('ghs', 'Ghanaian Cedi'),
  isoCurrency('gip', 'Gibraltar Pound'),
  isoCurrency('gmd', 'Gambian Dalasi'),
  isoCurrency('gnf', 'Guinean Franc'),
  isoCurrency('gtq', 'Guatemalan Quetzal'),
  isoCurrency('gyd', 'Guyanaese Dollar'),
  isoCurrency('hkd', 'Hong Kong Dollar'),
  isoCurrency('hnl', 'Honduran Lempira'),
  isoCurrency('htg', 'Haitian Gourde'),
  isoCurrency('huf', 'Hungarian Forint'),
  isoCurrency('idr', 'Indonesian Rupiah'),
  isoCurrency('ils', 'Israeli New Shekel'),
  isoCurrency('iqd', 'Iraqi Dinar'),
  isoCurrency('irr', 'Iranian Rial'),
  isoCurrency('isk', 'Icelandic Króna'),
  isoCurrency('jmd', 'Jamaican Dollar'),
  isoCurrency('jod', 'Jordanian Dinar'),
  isoCurrency('kes', 'Kenyan Shilling'),
  isoCurrency('kgs', 'Kyrgystani Som'),
  isoCurrency('khr', 'Cambodian Riel'),
  isoCurrency('kmf', 'Comorian Franc'),
  isoCurrency('kpw', 'North Korean Won'),
  isoCurrency('kwd', 'Kuwaiti Dinar'),
  isoCurrency('kyd', 'Cayman Islands Dollar'),
  isoCurrency('kzt', 'Kazakhstani Tenge'),
  isoCurrency('lak', 'Laotian Kip'),
  isoCurrency('lbp', 'Lebanese Pound'),
  isoCurrency('lkr', 'Sri Lankan Rupee'),
  isoCurrency('lrd', 'Liberian Dollar'),
  isoCurrency('lsl', 'Lesotho Loti'),
  isoCurrency('lyd', 'Libyan Dinar'),
  isoCurrency('mad', 'Moroccan Dirham'),
  isoCurrency('mdl', 'Moldovan Leu'),
  isoCurrency('mga', 'Malagasy Ariary'),
  isoCurrency('mkd', 'Macedonian Denar'),
  isoCurrency('mmk', 'Myanmar Kyat'),
  isoCurrency('mnt', 'Mongolian Tugrik'),
  isoCurrency('mop', 'Macanese Pataca'),
  isoCurrency('mru', 'Mauritanian Ouguiya'),
  isoCurrency('mur', 'Mauritian Rupee'),
  isoCurrency('mvr', 'Maldivian Rufiyaa'),
  isoCurrency('mwk', 'Malawian Kwacha'),
  isoCurrency('mxn', 'Mexican Peso'),
  isoCurrency('myr', 'Malaysian Ringgit'),
  isoCurrency('mzn', 'Mozambican Metical'),
  isoCurrency('nad', 'Namibian Dollar'),
  isoCurrency('nio', 'Nicaraguan Córdoba'),
  isoCurrency('nok', 'Norwegian Krone'),
  isoCurrency('npr', 'Nepalese Rupee'),
  isoCurrency('nzd', 'New Zealand Dollar'),
  isoCurrency('omr', 'Omani Rial'),
  isoCurrency('pab', 'Panamanian Balboa'),
  isoCurrency('pen', 'Peruvian Sol'),
  isoCurrency('pgk', 'Papua New Guinean Kina'),
  isoCurrency('php', 'Philippine Peso'),
  isoCurrency('pkr', 'Pakistani Rupee'),
  isoCurrency('pln', 'Polish Zloty'),
  isoCurrency('pyg', 'Paraguayan Guarani'),
  isoCurrency('qar', 'Qatari Riyal'),
  isoCurrency('ron', 'Romanian Leu'),
  isoCurrency('rsd', 'Serbian Dinar'),
  isoCurrency('rwf', 'Rwandan Franc'),
  isoCurrency('sar', 'Saudi Riyal'),
  isoCurrency('sbd', 'Solomon Islands Dollar'),
  isoCurrency('scr', 'Seychellois Rupee'),
  isoCurrency('sdg', 'Sudanese Pound'),
  isoCurrency('sgd', 'Singapore Dollar'),
  isoCurrency('shp', 'St. Helena Pound'),
  isoCurrency('sle', 'Sierra Leonean Leone'),
  isoCurrency('sos', 'Somali Shilling'),
  isoCurrency('srd', 'Surinamese Dollar'),
  isoCurrency('ssp', 'South Sudanese Pound'),
  isoCurrency('stn', 'São Tomé & Príncipe Dobra'),
  isoCurrency('svc', 'Salvadoran Colón'),
  isoCurrency('syp', 'Syrian Pound'),
  isoCurrency('szl', 'Swazi Lilangeni'),
  isoCurrency('thb', 'Thai Baht'),
  isoCurrency('tjs', 'Tajikistani Somoni'),
  isoCurrency('tmt', 'Turkmenistani Manat'),
  isoCurrency('tnd', 'Tunisian Dinar'),
  isoCurrency('top', 'Tongan Paʻanga'),
  isoCurrency('try', 'Turkish Lira'),
  isoCurrency('ttd', 'Trinidad & Tobago Dollar'),
  isoCurrency('twd', 'New Taiwan Dollar'),
  isoCurrency('tzs', 'Tanzanian Shilling'),
  isoCurrency('uah', 'Ukrainian Hryvnia'),
  isoCurrency('ugx', 'Ugandan Shilling'),
  isoCurrency('uyu', 'Uruguayan Peso'),
  isoCurrency('uzs', 'Uzbekistani Som'),
  isoCurrency('ved', 'Bolívar Soberano'),
  isoCurrency('ves', 'Venezuelan Bolívar'),
  isoCurrency('vnd', 'Vietnamese Dong'),
  isoCurrency('vuv', 'Vanuatu Vatu'),
  isoCurrency('wst', 'Samoan Tala'),
  isoCurrency('xaf', 'Central African CFA Franc'),
  isoCurrency('xcd', 'East Caribbean Dollar'),
  isoCurrency('xcg', 'Caribbean guilder'),
  isoCurrency('xof', 'West African CFA Franc'),
  isoCurrency('xpf', 'CFP Franc'),
  isoCurrency('yer', 'Yemeni Rial'),
  isoCurrency('zar', 'South African Rand'),
  isoCurrency('zmw', 'Zambian Kwacha'),
  isoCurrency('zwg', 'Zimbabwean Gold')
];

const DERIVED_CURRENCY_FORMATS: DerivedCurrencyFormat[] = [
  {
    derivedSuffix: '',
    valueFormatCode: '#,##0',
    exampleInput: 412.17,
    auto: true
  },
  {
    derivedSuffix: '0',
    valueFormatCode: '#,##0',
    exampleInput: 7043.123
  },
  {
    derivedSuffix: '1',
    valueFormatCode: '#,##0.0',
    exampleInput: 7043.123
  },
  {
    derivedSuffix: '2',
    valueFormatCode: '#,##0.00',
    exampleInput: 7043.123
  },
  {
    derivedSuffix: '0k',
    valueFormatCode: '#,##0,"k"',
    exampleInput: 64301.12
  },
  {
    derivedSuffix: '1k',
    valueFormatCode: '#,##0.0,"k"',
    exampleInput: 64301.12
  },
  {
    derivedSuffix: '2k',
    valueFormatCode: '#,##0.00,"k"',
    exampleInput: 64301.12
  },
  {
    derivedSuffix: '0m',
    valueFormatCode: '#,##0,,"M"',
    exampleInput: 4564301.12
  },
  {
    derivedSuffix: '1m',
    valueFormatCode: '#,##0.0,,"M"',
    exampleInput: 4564301.12
  },
  {
    derivedSuffix: '2m',
    valueFormatCode: '#,##0.00,,"M"',
    exampleInput: 4564301.12
  },
  {
    derivedSuffix: '0b',
    valueFormatCode: '#,##0,,,"B"',
    exampleInput: 9784564301.12
  },
  {
    derivedSuffix: '1b',
    valueFormatCode: '#,##0.0,,,"B"',
    exampleInput: 9784564301.12
  },
  {
    derivedSuffix: '2b',
    valueFormatCode: '#,##0.00,,,"B"',
    exampleInput: 9784564301.12
  }
];

const CURRENCY_FORMATS: FormatObject[] = SUPPORTED_CURRENCIES.flatMap((currency) => {
  return DERIVED_CURRENCY_FORMATS.map((derivedFormat) => {
    const symbolInFormatCode = currency.escapeCurrencySymbol
      ? `"${currency.currencySymbol}"`
      : currency.currencySymbol;

    const format: FormatObject = {
      formatTag: currency.primaryCode + derivedFormat.derivedSuffix,
      parentFormat: currency.primaryCode,
      formatCategory: 'currency',
      valueType: 'number',
      exampleInput: derivedFormat.exampleInput,
      titleTagReplacement: ` (${currency.currencySymbol.trim()})`,
      formatCode: '' // Will be set below
    };

    if (derivedFormat.auto) {
      format.formatCode = AUTO_FORMAT_CODE;
      format._autoFormat = {
        autoFormatFunction: (
          typedValue: unknown,
          _columnFormat: FormatObject,
          columnUnitSummary?: ColumnUnitSummary
        ) => {
          const numValue = typedValue as number;
          const implicitFormat = generateImplicitNumberFormat(columnUnitSummary, 2);
          let effectiveCode = `${symbolInFormatCode}${implicitFormat._autoFormat?.autoFormatCode || '#,##0'}`;
          let suffix = '';
          let displayValue = numValue;

          if (implicitFormat._autoFormat?.truncateUnits && implicitFormat._autoFormat?.columnUnits) {
            suffix = implicitFormat._autoFormat.columnUnits;
            displayValue = applyColumnUnits(numValue, implicitFormat._autoFormat.columnUnits) as number;
          } else {
            if (effectiveCode.endsWith('.0')) {
              effectiveCode = effectiveCode + '0';
            }
          }
          return ssf.format(effectiveCode, displayValue) + suffix;
        }
      };
    } else {
      format.formatCode = `${symbolInFormatCode}${derivedFormat.valueFormatCode}`;
    }

    if (derivedFormat.axisValueFormatCode) {
      format.axisFormatCode = derivedFormat.axisValueFormatCode;
    }

    return format;
  });
});

export const BUILT_IN_FORMATS: FormatObject[] = [
  ...CURRENCY_FORMATS,

  // Date/Time formats
  {
    formatTag: 'ddd',
    formatCode: 'ddd',
    formatCategory: 'date',
    valueType: 'date',
    exampleInput: '2022-01-09 12:45'
  },
  {
    formatTag: 'dddd',
    formatCode: 'dddd',
    formatCategory: 'date',
    valueType: 'date',
    exampleInput: '2022-01-09 12:45'
  },
  {
    formatTag: 'mmm',
    formatCode: 'mmm',
    formatCategory: 'date',
    valueType: 'date',
    exampleInput: '2022-01-09 12:45'
  },
  {
    formatTag: 'mmmm',
    formatCode: 'mmmm',
    formatCategory: 'date',
    valueType: 'date',
    exampleInput: '2022-01-09 12:45'
  },
  {
    formatTag: 'yyyy',
    formatCode: 'yyyy',
    formatCategory: 'date',
    valueType: 'date',
    exampleInput: '2022-01-09 12:45'
  },
  {
    formatTag: 'shortdate',
    formatCode: 'mmm d/yy',
    formatCategory: 'date',
    valueType: 'date',
    exampleInput: '2022-01-09 12:45'
  },
  {
    formatTag: 'longdate',
    formatCode: 'mmmm d, yyyy',
    formatCategory: 'date',
    valueType: 'date',
    exampleInput: '2022-01-09 12:45'
  },
  {
    formatTag: 'fulldate',
    formatCode: 'dddd mmmm d, yyyy',
    formatCategory: 'date',
    valueType: 'date',
    exampleInput: '2022-01-09 12:45'
  },
  {
    formatTag: 'mdy',
    formatCode: 'm/d/y',
    formatCategory: 'date',
    valueType: 'date',
    exampleInput: '2022-01-09 12:45'
  },
  {
    formatTag: 'dmy',
    formatCode: 'd/m/y',
    formatCategory: 'date',
    valueType: 'date',
    exampleInput: '2022-01-09 12:45'
  },
  {
    formatTag: 'hms',
    formatCode: 'H:MM:SS AM/PM',
    formatCategory: 'date',
    valueType: 'date',
    exampleInput: '2022-01-09T11:45:03'
  },

  // Number formats
  {
    formatTag: 'num0',
    formatCode: '#,##0',
    formatCategory: 'number',
    valueType: 'number',
    exampleInput: 11.23168
  },
  {
    formatTag: 'num1',
    formatCode: '#,##0.0',
    formatCategory: 'number',
    valueType: 'number',
    exampleInput: 11.23168
  },
  {
    formatTag: 'num2',
    formatCode: '#,##0.00',
    formatCategory: 'number',
    valueType: 'number',
    exampleInput: 11.23168
  },
  {
    formatTag: 'num3',
    formatCode: '#,##0.000',
    formatCategory: 'number',
    valueType: 'number',
    exampleInput: 11.23168
  },
  {
    formatTag: 'num4',
    formatCode: '#,##0.0000',
    formatCategory: 'number',
    valueType: 'number',
    exampleInput: 11.23168
  },
  {
    formatTag: 'num0k',
    formatCode: '#,##0,"k"',
    formatCategory: 'number',
    valueType: 'number',
    exampleInput: 64201
  },
  {
    formatTag: 'num1k',
    formatCode: '#,##0.0,"k"',
    formatCategory: 'number',
    valueType: 'number',
    exampleInput: 64201
  },
  {
    formatTag: 'num2k',
    formatCode: '#,##0.00,"k"',
    formatCategory: 'number',
    valueType: 'number',
    exampleInput: 64201
  },
  {
    formatTag: 'num0m',
    formatCode: '#,##0,,"M"',
    formatCategory: 'number',
    valueType: 'number',
    exampleInput: 42539483
  },
  {
    formatTag: 'num1m',
    formatCode: '#,##0.0,,"M"',
    formatCategory: 'number',
    valueType: 'number',
    exampleInput: 42539483
  },
  {
    formatTag: 'num2m',
    formatCode: '#,##0.00,,"M"',
    formatCategory: 'number',
    valueType: 'number',
    exampleInput: 42539483
  },
  {
    formatTag: 'num0b',
    formatCode: '#,##0,,,"B"',
    formatCategory: 'number',
    valueType: 'number',
    exampleInput: 1384937584
  },
  {
    formatTag: 'num1b',
    formatCode: '#,##0.0,,,"B"',
    formatCategory: 'number',
    valueType: 'number',
    exampleInput: 1384937584
  },
  {
    formatTag: 'num2b',
    formatCode: '#,##0.00,,,"B"',
    formatCategory: 'number',
    valueType: 'number',
    exampleInput: 1384937584
  },
  {
    formatTag: 'id',
    formatCode: '0',
    formatCategory: 'number',
    valueType: 'number',
    exampleInput: '921594675',
    titleTagReplacement: ' id'
  },
  {
    formatTag: 'fract',
    formatCode: '# ?/?',
    formatCategory: 'number',
    valueType: 'number',
    exampleInput: '0.25'
  },
  {
    formatTag: 'mult',
    formatCode: '#,##0.0"x"',
    formatCategory: 'number',
    valueType: 'number',
    exampleInput: '5.32'
  },
  {
    formatTag: 'mult0',
    formatCode: '#,##0"x"',
    formatCategory: 'number',
    valueType: 'number',
    exampleInput: '5.32'
  },
  {
    formatTag: 'mult1',
    formatCode: '#,##0.0"x"',
    formatCategory: 'number',
    valueType: 'number',
    exampleInput: '5.32'
  },
  {
    formatTag: 'mult2',
    formatCode: '#,##0.00"x"',
    formatCategory: 'number',
    valueType: 'number',
    exampleInput: '5.32'
  },
  {
    formatTag: 'sci',
    formatCode: '0.00E+0',
    formatCategory: 'number',
    valueType: 'number',
    exampleInput: '16546.1561'
  },

  // Percent formats
  {
    formatTag: 'pct',
    formatCode: AUTO_FORMAT_CODE,
    formatCategory: 'percent',
    valueType: 'number',
    exampleInput: 0.731,
    titleTagReplacement: '',
    _autoFormat: {
      autoFormatFunction: (
        typedValue: unknown,
        _columnFormat: FormatObject,
        columnUnitSummary?: ColumnUnitSummary
      ) => {
        const numValue = typedValue as number;
        if (columnUnitSummary?.unitType === 'number') {
          const adjustedColumnUnitSummary: ColumnUnitSummary = {
            min: columnUnitSummary.min * 100,
            max: columnUnitSummary.max * 100,
            median: columnUnitSummary.median * 100,
            maxDecimals: Math.max(columnUnitSummary.maxDecimals - 2, 0),
            unitType: columnUnitSummary.unitType
          };
          const format = generateImplicitNumberFormat(adjustedColumnUnitSummary);
          return ssf.format(format._autoFormat?.autoFormatCode || '#,##0', numValue * 100) + '%';
        } else {
          return ssf.format('#,##0%', numValue);
        }
      }
    }
  },
  {
    formatTag: 'pct0',
    formatCode: '#,##0%',
    formatCategory: 'percent',
    valueType: 'number',
    exampleInput: 0.731,
    titleTagReplacement: ''
  },
  {
    formatTag: 'pct1',
    formatCode: '#,##0.0%',
    formatCategory: 'percent',
    valueType: 'number',
    exampleInput: 0.731,
    titleTagReplacement: ''
  },
  {
    formatTag: 'pct2',
    formatCode: '#,##0.00%',
    formatCategory: 'percent',
    valueType: 'number',
    exampleInput: 0.731,
    titleTagReplacement: ''
  },
  {
    formatTag: 'pct3',
    formatCode: '#,##0.000%',
    formatCategory: 'percent',
    valueType: 'number',
    exampleInput: 0.731,
    titleTagReplacement: ''
  }
];
