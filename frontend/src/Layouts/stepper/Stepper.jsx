import {
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
  Box
} from '@chakra-ui/react'

const steps = [
  { title: 'Debate Information', description: '' },
  { title: 'Teams', description: '' },
  {title:"Time Format",description:""},
  {title:"Additional",description:""},
  { title: 'Confirm', description: '' },
]

export function StepperComp({active}) {
  const { activeStep } = useSteps({
    index: 0,
    count: steps.length,
  })


  return (
    <Stepper size='lg' colorScheme='yellow' index={active} mb={"2rem"}>
      {steps.map((step, index) => (
        <Step key={index}>
          <StepIndicator>
            <StepStatus complete={`✔`} incomplete={`💀`} active={`⚙`} />
          </StepIndicator>

          <Box flexShrink='0'>
            <StepTitle  style={{fontSize:"13px" ,color:"gray"}}>{step.title}</StepTitle>
            <StepDescription>{step.description}</StepDescription>
          </Box>
          <StepSeparator />
        </Step>
      ))}
    </Stepper>
  )
}



