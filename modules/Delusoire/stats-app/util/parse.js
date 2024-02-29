import { S } from "/modules/Delusoire/std/index.js";
const { URI } = S;
export const getURI = ({ uri }) => uri;
export const toID = (uri) => URI.fromString(uri).id;
