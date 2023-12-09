import { RoutesEnum } from "../routes";

export const HEADERS_URL_MAP: Map<RoutesEnum, string> = new Map<RoutesEnum, string>([
    [RoutesEnum.DUMPLINGS_LIST, 'header-pierogarnia'],
    [RoutesEnum.DUMPLING_DETAILS, 'header-pierogarnia'],
    [RoutesEnum.DUMPLING_GENERATOR, 'header-pierogator']
])