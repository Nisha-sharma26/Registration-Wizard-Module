# AI Debugging & Setup Prompts

This document tracks the AI assistance used for architectural guidance and debugging during the development of "The Registration Wizard" (Sprint 07).

## Session 1: Architecture Planning
**Prompt:** "How do I implement a multi-step form wizard using React Hook Form and Zod to replace standard useState lifting?"
**Response Summary:** Instructed to use `FormProvider` to manage the global form state at the parent level (`RegistrationWizard.jsx`). Each child step (`StepOne`, `StepTwo`, etc.) can call `useFormContext()` to access `register` and `errors`. A single Zod schema can be defined at the top level and passed to `useForm({ resolver: zodResolver(schema), mode: 'onChange' })` to enable real-time validation across all steps seamlessly.

## Session 2: Conditional Disabling of "Next"
**Prompt:** "How can I disable the Next button in a React Hook Form multi-step wizard until the specific fields in the current step are valid?"
**Response Summary:** Guided to use `watch()` to observe the values of the current step's fields, and cross-reference them with the `errors` object from `formState`. For example, on Step 1, verify `firstName`, `lastName`, and `dob` are populated and have no active errors before enabling the Next button.

## Session 3: Validating Step Before Advancing
**Prompt:** "When clicking Next, how do I prevent advancing to the next step if the fields are empty but haven't triggered 'onChange' validation yet?"
**Response Summary:** Advised to use the `trigger()` method provided by React Hook Form. By calling `await trigger(['firstName', 'lastName', 'dob'])` inside the `handleNext` function, the form will force-validate those specific fields. If `trigger()` returns true, then increment the `step` state.
