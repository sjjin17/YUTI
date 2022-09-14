import styled from '@emotion/styled';
import SelectedYtb from './SelectedYtb';

export default function MyYoutubers({ selectedList }) {
  console.log('myytb', selectedList);
  return (
    <>
      {selectedList.map((thumbnail, idx) => (
        <SelectedYtb key={idx} imageUrl={thumbnail}></SelectedYtb>
      ))}
    </>
  );
}
