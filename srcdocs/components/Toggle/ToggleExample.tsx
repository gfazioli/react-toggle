import * as React from "react";
import { useState } from "react";
import styled from "styled-components";
import Toggle from "../../../src/components/Toggle";
import { DocsExample } from "../../theme/theme";

export function ToggleExample() {

  return (
    <DocsExample>
      <h1>Toggle Example</h1>

      <p>
        <label htmlFor={"toggle-b"}>
          Click me
          <Toggle name="toggle-b" onToggle={e => console.log(e.target.checked)} />
        </label>
      </p>


    </DocsExample>
  );
}
