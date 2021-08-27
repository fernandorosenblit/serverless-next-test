import { isArray, isObject } from 'lodash';

const filterKeywords = {
  unary: ['not'],
  simple: ['eq', 'ne', 'gt', 'ge', 'lt', 'le', 'in'],
  listable: ['and', 'or'],
  function: ['contains', 'startswith', 'endwith', 'any', 'all']
};

const filterBuilder = (filter, father = null, quoteFilter = true) => {
  const quotedFilter =
    typeof filter === 'string' && quoteFilter ? (filter = `'${filter}'`) : filter;

  if (!isArray(filter) && !isObject(filter))
    return `${father ? `${father} eq ` : ''}${quotedFilter}`;

  if (isArray(filter)) return `(${filter.map(term => filterBuilder(term)).join(',')})`;

  const filterList = Object.entries(filter).map(([key, value]) => {
    if (filterKeywords.unary.includes(key)) return `${key} ${filterBuilder(value)}`;

    if (filterKeywords.simple.includes(key)) return `${father} ${key} ${filterBuilder(value)}`;

    if (filterKeywords.listable.includes(key)) {
      if (isArray(value)) return `(${value.map(x => `(${filterBuilder(x)})`).join(` ${key} `)})`;

      return `(${Object.entries(value)
        .map(([subKey, subValue]) => `(${filterBuilder({ [subKey]: subValue })})`)
        .join(` ${key} `)})`;
    }

    if (filterKeywords.function.includes(key))
      return `${key}(${father || ''}${father ? ', ' : ''}${filterBuilder(value, null, false)})`;

    return filterBuilder(value, key);
  });

  return filterList.join(' and ');
};

const includeBuilder = (includeObj, prefixTerm = null) => {
  const prefix = prefixTerm ? `${prefixTerm}.` : '';

  if (typeof includeObj === 'string') return `${prefix}${includeObj}`;
  if (isArray(includeObj))
    return includeObj.map(term => includeBuilder(term, prefixTerm)).join(',');

  const includeList = [];

  Object.entries(includeObj).map(([key, value]) => {
    includeList.push(`${prefix}${key}`);
    includeList.push(includeBuilder(value, `${prefix}${key}`));
  });

  return includeList.join(',');
};

const geoBuilder = geoSearch => {
  const geoList = [];

  const pushTerm = (key, value) => {
    if (value) geoList.push(`geoSearch[${key}]=${value}`);
  };

  Object.entries(geoSearch).map(([key, value]) => pushTerm(key, value));

  return geoList.join('&');
};

const searchBuilder = search => {
  const searchList = [`search[query]=${search.query}`];

  if (search.type) searchList.push(`search[type]=${search.type}`);

  return searchList.join('&');
};

/**
 * @typedef {object} QueryBuilderFilter
 * @example
 * queryBuilder({
 *   filter: {
 *     prop1: { eq: 1, le: 2 },
 *     or: {
 *       prop2: {
 *         ge: 100
 *       },
 *       prop3: {
 *         in: ['list', 'of', 'items']
 *       }
 *     },
 *     any: 'lambdaValue',
 *     lambdaProp: {
 *       all: {
 *         prop5: 'some value'
 *       }
 *     }
 *   }
 * });
 *
 * // => ?filter=prop1 eq 1 and prop1 le 2 and ((prop2 ge 100) or (prop3 in ('list','of','items'))) and any(lambdaValue) and all(lambdaProp, prop5 eq 'some value')
 */

/**
 * @typedef {object} QueryBuilderIncludes
 * @example
 * const includes = {
 *  "key": {
 *    "nested": ["value1", "value2"]
 *  }
 * }
 * // Results in => "key,key.nested,key.nested.value1,key.nested.value2"
 */

/**
 * @typedef {object} QueryBuilderGeoSearch
 * @property {string} [ip]
 * @property {string} [latitude]
 * @property {string} [longitude]
 * @property {string} [minRadius]
 * @property {string} maxRadius
 */

/**
 * @typedef {object} QueryBuilderFields
 * @property {string} type
 * @property {string[]} selectors
 */

/**
 * @typedef {object} QueryBuilderSearch
 * @property {string} query
 * @property {string} [type]
 */

/**
 * @typedef {object} QueryBuilderPagination
 * @property {number} number
 * @property {number} size
 */

/**
 * @typedef {object} QueryBuilder
 * @property {QueryBuilderIncludes} [include]
 * @property {(QueryBuilderFields|QueryBuilderFields[])} [fields]
 * @property {string[]} [sort]
 * @property {QueryBuilderPagination} [pagination]
 * @property {QueryBuilderSearch} [search]
 * @property {QueryBuilderGeoSearch} [geoSearch]
 * @property {QueryBuilderFilter} [filter]
 */

/**
 * @param {QueryBuilder} options
 */
const queryBuilder = ({ id, include, fields, sort, pagination, filter, geoSearch, search }) => {
  const querySegments = [];

  if (search) {
    querySegments.push(searchBuilder(search));
  }

  if (geoSearch) {
    querySegments.push(geoBuilder(geoSearch));
  }

  if (filter) {
    querySegments.push(`filter=${filterBuilder(filter)}`);
  }

  if (include) {
    querySegments.push(`include=${includeBuilder(include)}`);
  }

  if (fields) {
    if (!isArray(fields)) fields = [fields];
    fields.forEach(field =>
      querySegments.push(`fields[${field.type}]=${field.selectors.join(',')}`)
    );
  }

  if (sort) {
    querySegments.push(`sort=${sort.join(',')}`);
  }

  if (pagination) {
    querySegments.push(`page[number]=${pagination.number}&page[size]=${pagination.size}`);
  }

  return `${id ? `/${id}` : ''}${querySegments ? `?${querySegments.join('&')}` : ''}`;
};

export default queryBuilder;
