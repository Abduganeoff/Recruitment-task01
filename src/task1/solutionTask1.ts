type LeafValue<T> = T extends object ? never : T;

type DeepFreeze<T> = {
  readonly [K in keyof T]: T[K] extends object
    ? DeepFreeze<T[K]>
    : LeafValue<T[K]>;
};

type leafType = string | (() => string);

type TestIdsType = {
  readonly key1: {
    readonly key2: leafType;
    readonly key3: {
      readonly key4: leafType;
    };
  };
  readonly key5: leafType;
};

function typedFreeze<T extends TestIdsType>(obj: T): DeepFreeze<T> {
  const isLeafEmpty = (value: unknown): boolean =>
    typeof value === "object" &&
    value !== null &&
    Object.keys(value).length === 0;

  const freezeObject = <T>(obj: T): DeepFreeze<T> => {
    if (typeof obj !== "object" || obj === null) {
      return obj as DeepFreeze<T>;
    }

    const frozenObj: any = {};
    for (const key in obj) {
      const value = obj[key];
      if (!isLeafEmpty(value)) {
        frozenObj[key] = freezeObject(value);
      }
    }
    return Object.freeze(frozenObj) as DeepFreeze<T>;
  };

  return freezeObject(obj);
}

export default typedFreeze;
// Test Cases

// *****************************************************************
// const TEST_IDS = typedFreeze({
//   key1: { key2: "example", key3: { key4: "example2" } },
//   key5: () => "example3",
// } as const);

// *****************************************************************

// const TEST_IDS = typedFreeze({
//   key1: { key2: "example", key3: { key4: "example2" } },
//   key5: () => 10,
// } as const);

// *****************************************************************

// const TEST_IDS = typedFreeze({
//   key1: { key2: "example", key3: { key4: "example2" } },
//   key5: {},
// } as const);
