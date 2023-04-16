import styled from "styled-components";

export const IndicatorWrapper = styled.div`
  overflow: hidden;

  .i-content {
    display: flex;
    position: relative;
    transition: transform 200ms ease;

    > * { // 只要是Indicator的直接子元素, flex-shrink都应该为 0
      flex-shrink: 0;
    }
  }
`