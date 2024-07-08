/**
 * @author Jenna Cogswell
 */

import React, { Suspense } from "react";
import Results from "@/components/SearchResults/Results";

const search = () => {
  return (
    <Suspense>
      <Results />
    </Suspense>
  );
};

export default search;
