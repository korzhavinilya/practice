import { renderHook, act } from "@testing-library/react"
import useToggle from "./useToggle"

describe("useToggle Hook", () => {
  it("should toggle state", () => {
    const { result } = renderHook(() => useToggle(false))

    expect(result.current[0]).toBe(false)

    const toggle = result.current[1]

    act(() => {
      toggle()
    })

    expect(result.current[0]).toBe(true)
  })
})
