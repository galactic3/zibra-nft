import React, { useContext } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';

import { NearContext, MarketContractContext } from '../../../contexts';

import { getNextBidNearsFormatted } from '../../../utils/nears';

import { DisplayText } from '../../common/typography';
import { Contribute, MintPlus } from '../../common/popups';
import { ArtItemPriced } from '../../common/art';

import DiamondIcon from '../../../assets/DiamondIcon';

const Container = styled('div')`
  padding: 15px;
  max-width: 1200px;
  margin: 100px auto 0;

  .description-container {
    margin-left: 30px;
  }

  .items {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: space-evenly;
  }

  .item {
    position: relative;
    transition: 250ms;
    margin: 15px 5px;

    :hover {
      transform: scale(1.01);
    }

    img {
      border-radius: 8px;
      max-width: 100%;

      @media (min-width: 1100px) {
        max-width: 320px;
      }
    }

    button {
      position: absolute;
      right: 20px;
      bottom: 20px;
    }
  }

  .desc {
    margin-bottom: 20px;
    font-size: 24px;
    font-weight: 300;
    line-height: 36px;
  }

  .pop-up {
    position: sticky;
    bottom: 10px;
    right: 10px;
    width: fit-content;
    margin-left: auto;
  }

  @media (min-width: 767px) {
    .description-container {
      margin-left: 0;
      margin-bottom: 60px;
      text-align: center;
    }
  }
`;

export default function Home() {
  const { user } = useContext(NearContext);
  const { getSalesPopulated } = useContext(MarketContractContext);

  const { data: salesPopulated } = useQuery(['salesPopulated'], () => getSalesPopulated('0', '50'), {
    placeholderData: [],
  });

  return (
    <Container>
      <div className="description-container">
        <DisplayText isBig>RARE ART GEMS</DisplayText>
        <div className="desc">Create, buy, and sell NFT&apos;s with Cryptocurrency</div>
        <div className="diamond">
          <DiamondIcon />
        </div>
      </div>
      <div className="items-container">
        <div className="items">
          {salesPopulated.map((sale) => {
            const {
              token_id,
              metadata: { media },
            } = sale;

            return (
              <ArtItemPriced key={token_id} dataUrl={media} gemId={token_id} bid={getNextBidNearsFormatted(sale)} />
            );
          })}
        </div>
      </div>
      <div className="pop-up">{user ? <MintPlus /> : <Contribute />}</div>
    </Container>
  );
}
