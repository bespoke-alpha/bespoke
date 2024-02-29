import { URIClass } from "/modules/Delusoire/std/expose/webpack";
import { S } from "/modules/Delusoire/std/index.js";

const { URI } = S;

export const getURI = ({ uri }) => uri as string;
export const toID = (uri: URIClass<any>) => URI.fromString(uri).id as string;
