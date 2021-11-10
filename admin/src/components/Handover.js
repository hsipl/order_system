import React from 'react'
import styled from "styled-components";

const HandoverCon = styled.div`
  position: relative;
  top: 6rem;
  left: 10rem;
  max-width: 88%;
  font-size: 20px;
`;

const Handover = () => {
    return (
        <HandoverCon id="handover">
            Welcome to Handover page.
        </HandoverCon>
    )
}

export default Handover
