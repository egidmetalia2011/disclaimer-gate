// TerraCapitalIntroForm.tsx
// Update: Step 5 is conditional
// - If identifiedOrPurchased = "Yes" => full address inputs
// - If identifiedOrPurchased = "No"  => ONLY target state dropdown
// Disqualified leads do NOT post to Make
// Qualified leads post to Make after Q10

import * as React from "react"
import { addPropertyControls, ControlType } from "framer"

type YesNo = "Yes" | "No" | ""
type LoanHolder = "PERSONAL NAME" | "ENTITY" | ""
type FinancingType =
    | "Hard Money"
    | "Line of Credit"
    | "DSCR"
    | "Construction / Development"
    | "Not Sure Yet / Open to Multiple Options"
    | "Other"
    | ""

type PropertyType =
    | "Single Family Home"
    | "1–4-Unit Multi-Family"
    | "5+-Unit Multi-Family"
    | "Build-to-Rent"
    | "Student Housing"
    | "Senior Housing / Assisted Living"
    | "Commercial"
    | "Land"
    | "Portfolio Acquisition"
    | "Mobile Home Park"
    | "Other"
    | ""

const MAKE_WEBHOOK_URL =
    "https://hook.us2.make.com/wu21rd65rq3c6u08ywaxdl97gfg93yn2" // <-- paste your Make "Custom webhook" URL here

const TEXT_COLOR = "#122550"
const BG_COLOR = "#ffffff"

const DISQUALIFIED_STATES = new Set([
    "Arizona",
    "California",
    "Washington, DC",
    "Illinois",
    "Michigan",
    "Nebraska",
    "Nevada",
    "New Jersey",
    "New York",
    "North Carolina",
    "North Dakota",
    "Oregon",
    "Pennsylvania",
    "South Dakota",
    "Vermont",
])

const NATURAL_PERSON_BLOCK_STATES = new Set(["Alabama", "Florida", "Georgia"])

const US_STATES_WITH_DC = [
    "Alabama",
    "Alaska",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "Florida",
    "Georgia",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "New York",
    "North Carolina",
    "North Dakota",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Vermont",
    "Virginia",
    "Washington",
    "West Virginia",
    "Wisconsin",
    "Wyoming",
    "Washington, DC",
]

type FormState = {
    name: string
    email: string
    phone: string
    identifiedOrPurchased: YesNo

    // If identifiedOrPurchased === "Yes"
    street1: string
    street2: string
    city: string
    state: string
    zip: string

    // If identifiedOrPurchased === "No"
    targetState: string

    primaryResidence: YesNo
    propertyType: PropertyType
    commercialType: string
    otherPropertyInfo: string

    loanHolder: LoanHolder
    capitalSeeking: string
    financingType: FinancingType
    financingOtherExplain: string
}

type ReasonCode =
    | "STATE_BLOCKED"
    | "OWNER_OCCUPIED"
    | "SINGLE_FAMILY"
    | "MF_1_4"
    | "NATURAL_PERSON_BLOCKED"
    | "SUCCESS"

type Termination = {
    status: "disqualified" | "submitted"
    title: string
    message: string
    reasonCode: ReasonCode
}

function clean(s: string) {
    return (s || "").trim()
}

function isValidEmail(email: string) {
    const e = clean(email)
    if (!e) return false
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)
}

function isValidPhone(phone: string) {
    const p = clean(phone)
    if (!p) return false
    return /^[0-9+\-\s()]{7,}$/.test(p)
}

async function postToMake(payload: any) {
    if (!clean(MAKE_WEBHOOK_URL)) return { ok: true, skipped: true }

    const res = await fetch(MAKE_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    })

    return { ok: res.ok, status: res.status }
}

function FieldLabel({ children }: { children: React.ReactNode }) {
    return (
        <div
            style={{
                fontSize: 14,
                fontWeight: 600,
                marginBottom: 8,
                color: TEXT_COLOR,
            }}
        >
            {children}
        </div>
    )
}

function Input(
    props: React.InputHTMLAttributes<HTMLInputElement> & {
        onEnter?: () => void
    }
) {
    const { onEnter, onKeyDown, ...rest } = props
    return (
        <input
            {...rest}
            onKeyDown={(e) => {
                onKeyDown?.(e)
                if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    onEnter?.()
                }
            }}
            style={{
                width: "100%",
                padding: "12px 12px",
                borderRadius: 10,
                border: `1px solid rgba(18,37,80,0.25)`,
                outline: "none",
                color: TEXT_COLOR,
                fontSize: 14,
                background: "#fff",
            }}
        />
    )
}

function TextArea(
    props: React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
        onEnter?: () => void
    }
) {
    const { onEnter, onKeyDown, ...rest } = props
    return (
        <textarea
            {...rest}
            onKeyDown={(e) => {
                onKeyDown?.(e)
                if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    onEnter?.()
                }
            }}
            style={{
                width: "100%",
                minHeight: 110,
                padding: "12px 12px",
                borderRadius: 10,
                border: `1px solid rgba(18,37,80,0.25)`,
                outline: "none",
                color: TEXT_COLOR,
                fontSize: 14,
                background: "#fff",
                resize: "vertical",
            }}
        />
    )
}

function Select(
    props: React.SelectHTMLAttributes<HTMLSelectElement> & {
        onEnter?: () => void
    }
) {
    const { onEnter, onKeyDown, ...rest } = props
    return (
        <select
            {...rest}
            onKeyDown={(e) => {
                onKeyDown?.(e)
                if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    onEnter?.()
                }
            }}
            style={{
                width: "100%",
                padding: "12px 12px",
                borderRadius: 10,
                border: `1px solid rgba(18,37,80,0.25)`,
                outline: "none",
                color: TEXT_COLOR,
                fontSize: 14,
                background: "#fff",
            }}
        />
    )
}

function Button({
    children,
    onClick,
    disabled,
    variant = "primary",
}: {
    children: React.ReactNode
    onClick?: () => void
    disabled?: boolean
    variant?: "primary" | "secondary"
}) {
    const isPrimary = variant === "primary"
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            style={{
                width: "100%",
                padding: "12px 14px",
                borderRadius: 12,
                border: isPrimary ? "none" : `1px solid rgba(18,37,80,0.35)`,
                background: isPrimary ? TEXT_COLOR : "transparent",
                color: isPrimary ? "#fff" : TEXT_COLOR,
                fontWeight: 700,
                fontSize: 14,
                cursor: disabled ? "not-allowed" : "pointer",
                opacity: disabled ? 0.55 : 1,
            }}
        >
            {children}
        </button>
    )
}

function Progress({ current, total }: { current: number; total: number }) {
    return (
        <div
            style={{
                marginTop: 16,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                color: TEXT_COLOR,
                opacity: 0.75,
                fontSize: 12,
            }}
        >
            <div>
                {current}/{total}
            </div>
            <div style={{ opacity: 0.85 }}>Press Enter to continue</div>
        </div>
    )
}

const TOTAL_STEPS = 10

export default function TerraCapitalIntroForm(props: {
    cornerRadius: number
    maxWidth: number
    title: string
    subtitle: string
}) {
    const [step, setStep] = React.useState<number>(1)
    const [loading, setLoading] = React.useState(false)
    const [termination, setTermination] = React.useState<Termination | null>(
        null
    )
    const [error, setError] = React.useState<string>("")

    const [data, setData] = React.useState<FormState>({
        name: "",
        email: "",
        phone: "",
        identifiedOrPurchased: "",

        street1: "",
        street2: "",
        city: "",
        state: "",
        zip: "",

        targetState: "",

        primaryResidence: "",
        propertyType: "",
        commercialType: "",
        otherPropertyInfo: "",

        loanHolder: "",
        capitalSeeking: "",
        financingType: "",
        financingOtherExplain: "",
    })

    function update<K extends keyof FormState>(key: K, value: FormState[K]) {
        setData((d) => ({ ...d, [key]: value }))
    }

    function getPropertyStateForRules() {
        // If property is identified, use address state; otherwise use targetState
        if (data.identifiedOrPurchased === "Yes") return clean(data.state)
        return clean(data.targetState)
    }

    function disqualify(
        reasonCode: Exclude<ReasonCode, "SUCCESS">,
        message: string
    ) {
        setTermination({
            status: "disqualified",
            title: "Not a fit",
            message,
            reasonCode,
        })
    }

    async function submitQualified() {
        setLoading(true)
        try {
            const payload = {
                formName: "Terra Capital Partner Introductions",
                submittedAt: new Date().toISOString(),
                status: "qualified",
                reasonCode: "SUCCESS",
                successMessage:
                    "Thank you for your submission! A member of our team will reach out to you within 24 hours!",
                answers: { ...data },
                path: { stepReached: step },
                toInternalEmail: "terradigitalcorp@gmail.com",
                toApplicantEmail: data.email,
                applicantName: data.name,
            }

            await postToMake(payload)
        } finally {
            setLoading(false)
        }

        setTermination({
            status: "submitted",
            title: "Submitted",
            message:
                "Thank you for your submission! A member of our team will reach out to you within 24 hours!",
            reasonCode: "SUCCESS",
        })
    }

    async function handleNext() {
        if (loading) return
        setError("")

        if (step === 1 && !clean(data.name))
            return setError("Please enter your name.")
        if (step === 2 && !isValidEmail(data.email))
            return setError("Please enter a valid email.")
        if (step === 3 && !isValidPhone(data.phone))
            return setError("Please enter a valid phone number.")
        if (step === 4 && !data.identifiedOrPurchased)
            return setError("Please select an option.")

        if (step === 5) {
            // Conditional Step 5 validation
            if (data.identifiedOrPurchased === "Yes") {
                if (!clean(data.street1))
                    return setError("Please enter Street Address 1.")
                if (!clean(data.city)) return setError("Please enter City.")
                if (!clean(data.state))
                    return setError("Please select a State.")
                if (!clean(data.zip)) return setError("Please enter ZIP Code.")
            } else {
                if (!clean(data.targetState))
                    return setError("Please select a State.")
            }

            const st = getPropertyStateForRules()
            if (DISQUALIFIED_STATES.has(st)) {
                return disqualify(
                    "STATE_BLOCKED",
                    "Thank you for your submission. Unfortunately, Terra is unable to facilitate capital partner introductions in this state."
                )
            }
        }

        if (step === 6) {
            if (!data.primaryResidence)
                return setError("Please select an option.")
            if (data.primaryResidence === "Yes") {
                return disqualify(
                    "OWNER_OCCUPIED",
                    "Thank you for your submission. Unfortunately, Terra is unable to facilitate capital partner introductions for owner-occupied properties."
                )
            }
        }

        if (step === 7) {
            if (!data.propertyType)
                return setError("Please select a property type.")

            if (data.propertyType === "Single Family Home") {
                return disqualify(
                    "SINGLE_FAMILY",
                    "Thank you for your submission. Unfortunately, Terra is unable to facilitate capital partner introductions for single family properties."
                )
            }

            if (data.propertyType === "1–4-Unit Multi-Family") {
                return disqualify(
                    "MF_1_4",
                    "Thank you for your submission. Unfortunately, Terra is unable to facilitate capital partner introductions for 1-4 unit multi-family properties."
                )
            }

            if (
                data.propertyType === "Commercial" &&
                !clean(data.commercialType)
            ) {
                return setError(
                    "Please tell us what type of commercial property this is."
                )
            }

            if (
                data.propertyType === "Other" &&
                !clean(data.otherPropertyInfo)
            ) {
                return setError("Please provide additional information.")
            }
        }

        if (step === 8) {
            if (!data.loanHolder) return setError("Please select an option.")

            const st = getPropertyStateForRules()
            if (
                data.loanHolder === "PERSONAL NAME" &&
                NATURAL_PERSON_BLOCK_STATES.has(st)
            ) {
                return disqualify(
                    "NATURAL_PERSON_BLOCKED",
                    "Thank you for your submission. Unfortunately, Terra is unable to facilitate capital partner introductions to natural persons in this state."
                )
            }
        }

        if (step === 9) {
            if (!clean(data.capitalSeeking))
                return setError(
                    "Please enter the amount of capital you are seeking."
                )
        }

        if (step === 10) {
            if (!data.financingType)
                return setError("Please select a financing type.")
            if (
                data.financingType === "Other" &&
                !clean(data.financingOtherExplain)
            ) {
                return setError(
                    "Please explain what type of financing you’re exploring."
                )
            }
            return submitQualified()
        }

        setStep((s) => Math.min(TOTAL_STEPS, s + 1))
    }

    function handleBack() {
        if (loading) return
        setError("")
        setStep((s) => Math.max(1, s - 1))
    }

    function resetForm() {
        setTermination(null)
        setError("")
        setLoading(false)
        setStep(1)
        setData({
            name: "",
            email: "",
            phone: "",
            identifiedOrPurchased: "",

            street1: "",
            street2: "",
            city: "",
            state: "",
            zip: "",

            targetState: "",

            primaryResidence: "",
            propertyType: "",
            commercialType: "",
            otherPropertyInfo: "",

            loanHolder: "",
            capitalSeeking: "",
            financingType: "",
            financingOtherExplain: "",
        })
    }

    const containerStyle: React.CSSProperties = {
        width: "100%",
        maxWidth: props.maxWidth,
        background: BG_COLOR,
        color: TEXT_COLOR,
        borderRadius: props.cornerRadius,
        border: `1px solid rgba(18,37,80,0.12)`,
        padding: 20,
        boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
        fontFamily:
            'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji","Segoe UI Emoji"',
    }

    const titleStyle: React.CSSProperties = {
        fontSize: 18,
        fontWeight: 800,
        margin: 0,
        color: TEXT_COLOR,
    }

    const subtitleStyle: React.CSSProperties = {
        margin: "8px 0 0",
        fontSize: 13,
        opacity: 0.78,
        color: TEXT_COLOR,
        lineHeight: 1.35,
    }

    if (termination) {
        return (
            <div style={containerStyle}>
                <h3 style={titleStyle}>{termination.title}</h3>
                <p style={subtitleStyle}>{termination.message}</p>
                <div style={{ marginTop: 14, display: "grid", gap: 10 }}>
                    <Button variant="secondary" onClick={resetForm}>
                        Start Over
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div style={containerStyle}>
            <h3 style={titleStyle}>{props.title}</h3>
            <p style={subtitleStyle}>{props.subtitle}</p>

            <div style={{ display: "grid", gap: 14, marginTop: 16 }}>
                {step === 1 && (
                    <div>
                        <FieldLabel>Name</FieldLabel>
                        <Input
                            value={data.name}
                            onChange={(e) => update("name", e.target.value)}
                            onEnter={handleNext}
                        />
                    </div>
                )}

                {step === 2 && (
                    <div>
                        <FieldLabel>Email</FieldLabel>
                        <Input
                            value={data.email}
                            onChange={(e) => update("email", e.target.value)}
                            inputMode="email"
                            onEnter={handleNext}
                        />
                    </div>
                )}

                {step === 3 && (
                    <div>
                        <FieldLabel>Phone number</FieldLabel>
                        <Input
                            value={data.phone}
                            onChange={(e) => update("phone", e.target.value)}
                            inputMode="tel"
                            onEnter={handleNext}
                        />
                    </div>
                )}

                {step === 4 && (
                    <div>
                        <FieldLabel>
                            Have you identified and/or purchased the property
                            yet?
                        </FieldLabel>
                        <Select
                            value={data.identifiedOrPurchased}
                            onChange={(e) =>
                                update(
                                    "identifiedOrPurchased",
                                    e.target.value as YesNo
                                )
                            }
                            onEnter={handleNext}
                        >
                            <option value="">Select…</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </Select>
                    </div>
                )}

                {step === 5 && (
                    <div style={{ display: "grid", gap: 12 }}>
                        {data.identifiedOrPurchased === "Yes" ? (
                            <>
                                <FieldLabel>
                                    What is the address of the property? If this
                                    is in relation to a portfolio acquisition,
                                    please list one address.
                                </FieldLabel>

                                <div>
                                    <div
                                        style={{
                                            fontSize: 12,
                                            opacity: 0.75,
                                            marginBottom: 6,
                                        }}
                                    >
                                        Street Address 1
                                    </div>
                                    <Input
                                        value={data.street1}
                                        onChange={(e) =>
                                            update("street1", e.target.value)
                                        }
                                        onEnter={handleNext}
                                    />
                                </div>

                                <div>
                                    <div
                                        style={{
                                            fontSize: 12,
                                            opacity: 0.75,
                                            marginBottom: 6,
                                        }}
                                    >
                                        Address Line 2
                                    </div>
                                    <Input
                                        value={data.street2}
                                        onChange={(e) =>
                                            update("street2", e.target.value)
                                        }
                                        onEnter={handleNext}
                                    />
                                </div>

                                <div
                                    style={{
                                        display: "grid",
                                        gridTemplateColumns: "1fr 1fr",
                                        gap: 12,
                                    }}
                                >
                                    <div>
                                        <div
                                            style={{
                                                fontSize: 12,
                                                opacity: 0.75,
                                                marginBottom: 6,
                                            }}
                                        >
                                            City
                                        </div>
                                        <Input
                                            value={data.city}
                                            onChange={(e) =>
                                                update("city", e.target.value)
                                            }
                                            onEnter={handleNext}
                                        />
                                    </div>

                                    <div>
                                        <div
                                            style={{
                                                fontSize: 12,
                                                opacity: 0.75,
                                                marginBottom: 6,
                                            }}
                                        >
                                            State
                                        </div>
                                        <Select
                                            value={data.state}
                                            onChange={(e) =>
                                                update("state", e.target.value)
                                            }
                                            onEnter={handleNext}
                                        >
                                            <option value="">Select…</option>
                                            {US_STATES_WITH_DC.map((st) => (
                                                <option key={st} value={st}>
                                                    {st}
                                                </option>
                                            ))}
                                        </Select>
                                    </div>
                                </div>

                                <div style={{ maxWidth: 220 }}>
                                    <div
                                        style={{
                                            fontSize: 12,
                                            opacity: 0.75,
                                            marginBottom: 6,
                                        }}
                                    >
                                        ZIP Code
                                    </div>
                                    <Input
                                        value={data.zip}
                                        onChange={(e) =>
                                            update("zip", e.target.value)
                                        }
                                        onEnter={handleNext}
                                    />
                                </div>
                            </>
                        ) : (
                            <>
                                <FieldLabel>
                                    What state will you be purchasing this
                                    property in?
                                </FieldLabel>
                                <Select
                                    value={data.targetState}
                                    onChange={(e) =>
                                        update("targetState", e.target.value)
                                    }
                                    onEnter={handleNext}
                                >
                                    <option value="">Select…</option>
                                    {US_STATES_WITH_DC.map((st) => (
                                        <option key={st} value={st}>
                                            {st}
                                        </option>
                                    ))}
                                </Select>
                            </>
                        )}
                    </div>
                )}

                {step === 6 && (
                    <div>
                        <FieldLabel>
                            Will this be your primary residence?
                        </FieldLabel>
                        <Select
                            value={data.primaryResidence}
                            onChange={(e) =>
                                update(
                                    "primaryResidence",
                                    e.target.value as YesNo
                                )
                            }
                            onEnter={handleNext}
                        >
                            <option value="">Select…</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </Select>
                    </div>
                )}

                {step === 7 && (
                    <div style={{ display: "grid", gap: 12 }}>
                        <div>
                            <FieldLabel>
                                What type of property is this?
                            </FieldLabel>
                            <Select
                                value={data.propertyType}
                                onChange={(e) =>
                                    update(
                                        "propertyType",
                                        e.target.value as PropertyType
                                    )
                                }
                                onEnter={handleNext}
                            >
                                <option value="">Select…</option>
                                <option value="Single Family Home">
                                    Single Family Home
                                </option>
                                <option value="1–4-Unit Multi-Family">
                                    1–4-Unit Multi-Family
                                </option>
                                <option value="5+-Unit Multi-Family">
                                    5+-Unit Multi-Family
                                </option>
                                <option value="Build-to-Rent">
                                    Build-to-Rent
                                </option>
                                <option value="Student Housing">
                                    Student Housing
                                </option>
                                <option value="Senior Housing / Assisted Living">
                                    Senior Housing / Assisted Living
                                </option>
                                <option value="Commercial">Commercial</option>
                                <option value="Land">Land</option>
                                <option value="Portfolio Acquisition">
                                    Portfolio Acquisition
                                </option>
                                <option value="Mobile Home Park">
                                    Mobile Home Park
                                </option>
                                <option value="Other">Other</option>
                            </Select>
                        </div>

                        {data.propertyType === "Commercial" && (
                            <div>
                                <FieldLabel>
                                    What type of commercial property is this?
                                </FieldLabel>
                                <Input
                                    value={data.commercialType}
                                    onChange={(e) =>
                                        update("commercialType", e.target.value)
                                    }
                                    onEnter={handleNext}
                                />
                            </div>
                        )}

                        {data.propertyType === "Other" && (
                            <div>
                                <FieldLabel>
                                    Please provide additional information
                                </FieldLabel>
                                <TextArea
                                    value={data.otherPropertyInfo}
                                    onChange={(e) =>
                                        update(
                                            "otherPropertyInfo",
                                            e.target.value
                                        )
                                    }
                                    onEnter={handleNext}
                                />
                            </div>
                        )}
                    </div>
                )}

                {step === 8 && (
                    <div>
                        <FieldLabel>
                            Will the loan be in your personal name, or through
                            an entity? (i.e. LLC, LP, corporation)
                        </FieldLabel>
                        <Select
                            value={data.loanHolder}
                            onChange={(e) =>
                                update(
                                    "loanHolder",
                                    e.target.value as LoanHolder
                                )
                            }
                            onEnter={handleNext}
                        >
                            <option value="">Select…</option>
                            <option value="PERSONAL NAME">Personal Name</option>
                            <option value="ENTITY">Entity</option>
                        </Select>
                    </div>
                )}

                {step === 9 && (
                    <div>
                        <FieldLabel>
                            How much capital are you seeking?
                        </FieldLabel>
                        <Input
                            value={data.capitalSeeking}
                            onChange={(e) =>
                                update("capitalSeeking", e.target.value)
                            }
                            onEnter={handleNext}
                        />
                    </div>
                )}

                {step === 10 && (
                    <div style={{ display: "grid", gap: 12 }}>
                        <div>
                            <FieldLabel>
                                What type of financing are you currently
                                exploring?
                            </FieldLabel>
                            <Select
                                value={data.financingType}
                                onChange={(e) =>
                                    update(
                                        "financingType",
                                        e.target.value as FinancingType
                                    )
                                }
                                onEnter={handleNext}
                            >
                                <option value="">Select…</option>
                                <option value="Hard Money">Hard Money</option>
                                <option value="Line of Credit">
                                    Line of Credit
                                </option>
                                <option value="DSCR">DSCR</option>
                                <option value="Construction / Development">
                                    Construction / Development
                                </option>
                                <option value="Not Sure Yet / Open to Multiple Options">
                                    Not Sure Yet / Open to Multiple Options
                                </option>
                                <option value="Other">Other</option>
                            </Select>
                        </div>

                        {data.financingType === "Other" && (
                            <div>
                                <FieldLabel>Please explain</FieldLabel>
                                <TextArea
                                    value={data.financingOtherExplain}
                                    onChange={(e) =>
                                        update(
                                            "financingOtherExplain",
                                            e.target.value
                                        )
                                    }
                                    onEnter={handleNext}
                                />
                            </div>
                        )}
                    </div>
                )}

                {error && (
                    <div
                        style={{
                            background: "rgba(18,37,80,0.06)",
                            border: "1px solid rgba(18,37,80,0.18)",
                            padding: 12,
                            borderRadius: 12,
                            color: TEXT_COLOR,
                            fontSize: 13,
                        }}
                    >
                        {error}
                    </div>
                )}

                <div style={{ display: "grid", gap: 10, marginTop: 4 }}>
                    <button
                        onClick={handleNext}
                        disabled={loading}
                        style={{
                            width: "100%",
                            padding: "12px 14px",
                            borderRadius: 12,
                            border: "none",
                            background: TEXT_COLOR,
                            color: "#fff",
                            fontWeight: 700,
                            fontSize: 14,
                            cursor: loading ? "not-allowed" : "pointer",
                            opacity: loading ? 0.55 : 1,
                        }}
                    >
                        {loading
                            ? "Submitting…"
                            : step === 10
                              ? "Submit"
                              : "Next"}
                    </button>

                    {step > 1 && (
                        <Button
                            onClick={handleBack}
                            variant="secondary"
                            disabled={loading}
                        >
                            Back
                        </Button>
                    )}
                </div>

                <Progress current={step} total={TOTAL_STEPS} />
            </div>
        </div>
    )
}

addPropertyControls(TerraCapitalIntroForm, {
    title: {
        type: ControlType.String,
        defaultValue: "Capital Partner Introduction",
    },
    subtitle: {
        type: ControlType.String,
        defaultValue:
            "Answer a few questions and we’ll route your submission to the right place.",
    },
    maxWidth: {
        type: ControlType.Number,
        defaultValue: 520,
        min: 280,
        max: 900,
        step: 10,
    },
    cornerRadius: {
        type: ControlType.Number,
        defaultValue: 18,
        min: 0,
        max: 40,
        step: 1,
    },
})