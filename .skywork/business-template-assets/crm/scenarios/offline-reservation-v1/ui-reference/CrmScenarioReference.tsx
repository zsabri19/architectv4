import fixture from "./fixture.json";
import { CrmScenarioReference as Reference } from "../../../ui-reference/CrmScenarioReference";

export function CrmScenarioReference() {
  return <Reference fixture={fixture} />;
}
