import * as React from "react";
import { useState } from "react";
import styled from "styled-components";
import Toggle from "../../../src/components/Toggle";
import { DocsExample } from "../../theme/theme";

export function ToggleExample() {

  return (
    <DocsExample>
      <h1>Toggle Example</h1>

      <h2>Simple Toggle</h2>

      <p>
        <Toggle name="toggle-a" />
      </p>

      <p>
        <label htmlFor={"toggle-b"}>
          Click me
          <Toggle name="toggle-b" onToggle={e => console.log(e.target.checked)} />
        </label>
      </p>

      <p>
        <label htmlFor={"toggle-c"}>
          <Toggle name="toggle-c" onLeft={e => console.log("onLeft",e.target.name)} onRight={e => console.log("onRight",e.target.name)}/>
          Click me
        </label>
      </p>

      <p>
        <label htmlFor={"toggle-d"}>
          Disabled
          <Toggle name="toggle-d" disabled />
        </label>
      </p>

    </DocsExample>
  );
}
