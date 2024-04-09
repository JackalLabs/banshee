import { QueryClient } from '@cosmjs/stargate'
import { CometClient } from '@cosmjs/tendermint-rpc'
import type { TCreateExtension, TQueryLibrary } from '@/types'

export function processExtensions(
  tmClient: CometClient,
  ex: TCreateExtension[],
): TQueryLibrary {
  const [
    aa,
    bb,
    cc,
    dd,
    ee,
    ff,
    gg,
    hh,
    ii,
    jj,
    kk,
    ll,
    mm,
    nn,
    oo,
    pp,
    qq,
    rr,
  ] = ex
  switch (ex.length) {
    case 0:
      return QueryClient.withExtensions(tmClient) as TQueryLibrary
    case 1:
      return QueryClient.withExtensions(tmClient, aa)
    case 2:
      return QueryClient.withExtensions(tmClient, aa, bb)
    case 3:
      return QueryClient.withExtensions(tmClient, aa, bb, cc)
    case 4:
      return QueryClient.withExtensions(tmClient, aa, bb, cc, dd)
    case 5:
      return QueryClient.withExtensions(tmClient, aa, bb, cc, dd, ee)
    case 6:
      return QueryClient.withExtensions(tmClient, aa, bb, cc, dd, ee, ff)
    case 7:
      return QueryClient.withExtensions(tmClient, aa, bb, cc, dd, ee, ff, gg)
    case 8:
      return QueryClient.withExtensions(
        tmClient,
        aa,
        bb,
        cc,
        dd,
        ee,
        ff,
        gg,
        hh,
      )
    case 9:
      return QueryClient.withExtensions(
        tmClient,
        aa,
        bb,
        cc,
        dd,
        ee,
        ff,
        gg,
        hh,
        ii,
      )
    case 10:
      return QueryClient.withExtensions(
        tmClient,
        aa,
        bb,
        cc,
        dd,
        ee,
        ff,
        gg,
        hh,
        ii,
        jj,
      )
    case 11:
      return QueryClient.withExtensions(
        tmClient,
        aa,
        bb,
        cc,
        dd,
        ee,
        ff,
        gg,
        hh,
        ii,
        jj,
        kk,
      )
    case 12:
      return QueryClient.withExtensions(
        tmClient,
        aa,
        bb,
        cc,
        dd,
        ee,
        ff,
        gg,
        hh,
        ii,
        jj,
        kk,
        ll,
      )
    case 13:
      return QueryClient.withExtensions(
        tmClient,
        aa,
        bb,
        cc,
        dd,
        ee,
        ff,
        gg,
        hh,
        ii,
        jj,
        kk,
        ll,
        mm,
      )
    case 14:
      return QueryClient.withExtensions(
        tmClient,
        aa,
        bb,
        cc,
        dd,
        ee,
        ff,
        gg,
        hh,
        ii,
        jj,
        kk,
        ll,
        mm,
        nn,
      )
    case 15:
      return QueryClient.withExtensions(
        tmClient,
        aa,
        bb,
        cc,
        dd,
        ee,
        ff,
        gg,
        hh,
        ii,
        jj,
        kk,
        ll,
        mm,
        nn,
        oo,
      )
    case 16:
      return QueryClient.withExtensions(
        tmClient,
        aa,
        bb,
        cc,
        dd,
        ee,
        ff,
        gg,
        hh,
        ii,
        jj,
        kk,
        ll,
        mm,
        nn,
        oo,
        pp,
      )
    case 17:
      return QueryClient.withExtensions(
        tmClient,
        aa,
        bb,
        cc,
        dd,
        ee,
        ff,
        gg,
        hh,
        ii,
        jj,
        kk,
        ll,
        mm,
        nn,
        oo,
        pp,
        qq,
      )
    case 18:
      return QueryClient.withExtensions(
        tmClient,
        aa,
        bb,
        cc,
        dd,
        ee,
        ff,
        gg,
        hh,
        ii,
        jj,
        kk,
        ll,
        mm,
        nn,
        oo,
        pp,
        qq,
        rr,
      )
    default:
      throw new Error('Too many extensions')
  }
}
