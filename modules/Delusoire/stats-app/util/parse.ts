import { URIClass } from "/modules/Delusoirestd/expose/webpack";
import { S } from "/modules/Delusoirestd/index.js";

const { URI } = S;

export const getURI = ({ uri }) => uri as string;
export const toID = (uri: URIClass<any>) => URI.fromString(uri).id as string;
