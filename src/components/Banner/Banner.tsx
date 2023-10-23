import styled from '@emotion/styled';
import bannerImage from 'src/assets/img/Banner.svg';
import bannerTitle from 'src/assets/img/Vibes&Happenings.svg';
import { Searchbar } from '../Searchbar/Searchbar';
import { FC } from 'react';

export const Banner: FC = () => {
  return (
    <Wrapper>
      <BannerWrapper>
        <Section>
          <img src={bannerTitle} />
          <Searchbar />
        </Section>
        <ImageWrapper>
          <img src={bannerImage} />
        </ImageWrapper>
      </BannerWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
`;

const BannerWrapper = styled.div`
  position: relative;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 50px;
  align-items: center;
  z-index: 2;
  position: absolute;
  left: 0;
  right: 0;
  top: 100px;
  margin-left: auto;
  margin-right: auto;
`;

const ImageWrapper = styled.div`
  width: 1000px;
  height: 350px;
`;
