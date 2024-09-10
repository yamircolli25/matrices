import { useState } from "react";
import AppInput from "../components/AppInput";
import styles from "../styles/general.module.scss";
import {
  cleanArrayByKey,
  multiplyByBase,
  reverseSignAndMultiplyByBase,
  getHandler,
  getLocalBase,
  clogStyle,
} from "../constants/functions";

/** GaussJordanCube function is used to calculate two matrix 3x3 with a Gauss Jordan method  */
const GaussJordanCube = () => {
  const [base] = useState(3);
  const [finalResult, setResult] = useState<never[][]>();
  const placeholderArray = ["x", "y", "z"];

  const getFormData = () => {
    setResult(undefined);

    // Obtener elementos visuales
    const inputs = document.querySelectorAll("input");

    // Limpieza del Arreglo A
    const orderedA = cleanArrayByKey("a-", base, inputs);

    // Limpieza del Arreglo B
    let orderedB = cleanArrayByKey("b-", base, inputs);

    // Creamos copias para el resultado
    const copyOrderedA: any[] = orderedA.map((e: any) => e.map((i: any) => i));
    const copyOrderedB: any[] = orderedB.map((e: any) => e.map((i: any) => i));

    /** Primer elemento de la fila 2 a cero (0)
     * | * | * | * |
     * | 0 | * | * |
     * | * | * | * |
     */
    console.log("%cStep 1", clogStyle);
    let firstRow = orderedA[0];
    let secondRow = orderedA[1];
    let thirdRow = orderedA[2];
    let localBase: any = getLocalBase(secondRow[0], firstRow[0]);
    let localBaseIsObject = typeof localBase !== "number";
    let operation = localBaseIsObject
      ? getHandler(localBase.positive)
      : getHandler(localBase);

    copyOrderedA[1] = operation(
      multiplyByBase(secondRow, localBaseIsObject ? localBase.positive : 1),
      reverseSignAndMultiplyByBase(
        firstRow,
        localBaseIsObject ? localBase.negative : localBase,
      ),
    );
    copyOrderedB[1] = operation(
      multiplyByBase(
        copyOrderedB[1],
        localBaseIsObject ? localBase.positive : 1,
      ),
      reverseSignAndMultiplyByBase(
        copyOrderedB[0],
        localBaseIsObject ? localBase.negative : localBase,
      ),
    );

    /** Primer elemento de la fila 3 a cero (0)
     * | * | * | * |
     * | * | * | * |
     * | 0 | * | * |
     */
    console.log("%cStep 2", clogStyle);
    firstRow = orderedA[0];
    thirdRow = orderedA[2];
    localBase = getLocalBase(thirdRow[0], firstRow[0]);
    localBaseIsObject = typeof localBase !== "number";
    operation = localBaseIsObject
      ? getHandler(localBase.negative)
      : getHandler(localBase);

    copyOrderedA[2] = operation(
      multiplyByBase(thirdRow, localBaseIsObject ? localBase.positive : 1),
      reverseSignAndMultiplyByBase(
        firstRow,
        localBaseIsObject ? localBase.positive : localBase,
      ),
    );
    copyOrderedB[2] = operation(
      multiplyByBase(
        copyOrderedB[2],
        localBaseIsObject ? localBase.positive : 1,
      ),
      reverseSignAndMultiplyByBase(
        copyOrderedB[0],
        localBaseIsObject ? localBase.positive : localBase,
      ),
    );

    /** Segundo elemento de la fila 3 a cero (0)
     * | * | * | * |
     * | * | * | * |
     * | * | 0 | * |
     */
    console.log("%cStep 3", clogStyle);
    thirdRow = copyOrderedA[2];
    secondRow = copyOrderedA[1];
    localBase = getLocalBase(thirdRow[1], secondRow[1]);
    localBaseIsObject = typeof localBase !== "number";
    operation = localBaseIsObject
      ? getHandler(localBase.negative)
      : getHandler(localBase);

    copyOrderedA[2] = operation(
      multiplyByBase(thirdRow, localBaseIsObject ? localBase.positive : 1),
      reverseSignAndMultiplyByBase(
        secondRow,
        localBaseIsObject ? localBase.positive : localBase,
      ),
    );

    copyOrderedB[2] = operation(
      copyOrderedB[2],
      reverseSignAndMultiplyByBase(
        copyOrderedB[1],
        localBaseIsObject ? localBase.positive : localBase,
      ),
    );

    /** Tercer elemento de la fila 1 a cero (0)
     * | * | * | 0 |
     * | * | * | * |
     * | * | * | * |
     */
    console.log("%cStep 4", clogStyle);
    firstRow = copyOrderedA[0];
    thirdRow = copyOrderedA[2];

    localBase = getLocalBase(firstRow[2], thirdRow[2]);
    localBaseIsObject = typeof localBase !== "number";
    operation = localBaseIsObject
      ? getHandler(localBase.positive)
      : getHandler(localBase);

    copyOrderedA[0] = operation(
      multiplyByBase(thirdRow, localBaseIsObject ? localBase.negative : 1),
      reverseSignAndMultiplyByBase(
        firstRow,
        localBaseIsObject ? localBase.positive : localBase,
      ),
    );

    copyOrderedB[0] = operation(
      multiplyByBase(
        copyOrderedB[2],
        localBaseIsObject ? localBase.negative : 1,
      ),
      reverseSignAndMultiplyByBase(
        copyOrderedB[0],
        localBaseIsObject ? localBase.positive : localBase,
      ),
    );

    /** Tercer elemento de la fila 2 a cero (0)
     * | * | * | * |
     * | * | * | 0 |
     * | * | * | * |
     */
    console.log("%cStep 5", clogStyle);
    secondRow = copyOrderedA[1];
    thirdRow = copyOrderedA[2];
    localBase = getLocalBase(secondRow[2], thirdRow[2]);
    localBaseIsObject = typeof localBase !== "number";

    operation = localBaseIsObject
      ? getHandler(localBase.negative)
      : getHandler(localBase);

    copyOrderedA[1] = operation(
      multiplyByBase(secondRow, localBaseIsObject ? localBase.positive : 1),
      reverseSignAndMultiplyByBase(
        thirdRow,
        localBaseIsObject ? localBase.negative : localBase,
      ),
    );

    copyOrderedB[1] = operation(
      reverseSignAndMultiplyByBase(
        copyOrderedB[2],
        localBaseIsObject ? localBase.negative : localBase,
      ),
      multiplyByBase(
        copyOrderedB[1],
        localBaseIsObject ? localBase.positive : 1,
      ),
    );

    /** Segundo elemento de la fila 1 a cero (0)
     * | * | 0 | * |
     * | * | * | * |
     * | * | * | * |
     */
    console.log("%cStep 6", clogStyle);
    firstRow = copyOrderedA[0];
    secondRow = copyOrderedA[1];
    localBase = getLocalBase(secondRow[1], firstRow[1]);
    localBaseIsObject = typeof localBase !== "number";
    operation = localBaseIsObject
      ? getHandler(localBase.negative)
      : getHandler(localBase);

    copyOrderedA[0] = operation(
      multiplyByBase(secondRow, localBaseIsObject ? localBase.positive : 1),
      reverseSignAndMultiplyByBase(
        firstRow,
        localBaseIsObject ? localBase.negative : localBase,
      ),
    );

    copyOrderedB[0] = operation(
      multiplyByBase(
        copyOrderedB[1],
        localBaseIsObject ? localBase.positive : 1,
      ),
      reverseSignAndMultiplyByBase(
        copyOrderedB[0],
        localBaseIsObject ? localBase.negative : localBase,
      ),
    );

    /** Matriz de identidad a 1 */
    firstRow = copyOrderedA[0];
    secondRow = copyOrderedA[1];
    thirdRow = copyOrderedA[2];

    const firstRowResult = firstRow.map((value) => value / firstRow[0]);
    const secondRowResult = secondRow.map((value) => value / secondRow[1]);
    const thirdRowResult = thirdRow.map((value) => value / thirdRow[2]);

    const indFirst = copyOrderedB[0] / firstRow[0];
    const indSecond = copyOrderedB[1] / secondRow[1];
    const indThird = copyOrderedB[2] / thirdRow[2];

    console.log([
      JSON.stringify(firstRowResult).replace(/\[|\]/g, ""),
      JSON.stringify(secondRowResult).replace(/\[|\]/g, ""),
      JSON.stringify(thirdRowResult).replace(/\[|\]/g, ""),
    ]);
    console.log([indFirst, indSecond, indThird]);

    firstRowResult.push(indFirst);
    secondRowResult.push(indSecond);
    thirdRowResult.push(indThird);

    setResult([firstRowResult, secondRowResult, thirdRowResult] as never[]);
  };

  return (
    <div className={styles.wrapper} id="wrapper">
      <h1 className={styles.mb}>Gauss Jordan 3x3</h1>

      <div className={styles.arrayContainer}>
        <table>
          <tbody>
            {Array.from({ length: base }).map((_: any, indexOne: number) => (
              <tr key={`ArrB${indexOne}`}>
                {Array.from({ length: base }).map(
                  (_: any, indexTwo: number) => (
                    <td
                      key={`a-${indexOne}-${indexTwo}`}
                      className={
                        (base === 2 && indexTwo === 1) ||
                        (base === 3 && indexTwo === 2)
                          ? styles.lastSpace
                          : ""
                      }
                    >
                      <AppInput
                        id={`a-${indexOne}-${indexTwo}`}
                        placeholder={placeholderArray[indexTwo]}
                      />
                    </td>
                  ),
                )}

                {Array.from({ length: 1 }).map((_: any, indexTwo: number) => (
                  <td
                    key={`b-${indexOne}-${indexTwo}`}
                    className={styles.independent}
                  >
                    <AppInput
                      id={`b-${indexOne}-${indexTwo}`}
                      placeholder="i"
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.mt}>
        <button onClick={getFormData}>Determinar</button>
      </div>

      {finalResult !== undefined && (
        <>
          <table className={styles.mt}>
            <tbody>
              {finalResult.map((level, index) => (
                <tr key={`arr${index}`}>
                  {level.map((value: any, indexValue: number) => (
                    <td
                      className={styles.squareInput}
                      key={`result-${index}-${indexValue}`}
                    >
                      {(value as number).toFixed(0)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default GaussJordanCube;