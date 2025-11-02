/**
 * @typedef {Object} Train
 * @property {string} id
 * @property {string} name
 * @property {string} number
 * @property {number} capacity
 * @property {string[]} classes
 * @property {"active"|"maintenance"|"inactive"} status
 */

/**
 * @typedef {Object} Stop
 * @property {string} station
 * @property {string} arrivalISO
 * @property {string} departureISO
 */

/**
 * @typedef {Object} Schedule
 * @property {string} id
 * @property {string} trainId
 * @property {string} origin
 * @property {string} destination
 * @property {Stop[]} stops
 * @property {string[]} days // e.g., ["Mon","Tue",...]
 * @property {string} startDateISO
 */

export const TRAIN_STATUSES = ["active", "maintenance", "inactive"];

export const WEEK_DAYS = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
