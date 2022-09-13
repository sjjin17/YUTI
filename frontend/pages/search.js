import styled from '@emotion/styled';
import SearchTemplate from '../template/SearchTemplate';

const Container = styled.div`
  display: flex;
  align-items: center;
`;

export default function Search() {
  return (
    <>
      <Container>
        <SearchTemplate></SearchTemplate>
      </Container>
    </>
  );
}
