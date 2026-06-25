# PetLead AI

AI-powered abandoned lead recovery system for pet insurance businesses.

Live Demo: https://petlead-ai-demo.vercel.app/

![Uploading image.png…]()


---

## Overview

PetLead AI demonstrates how AI and automation can help businesses recover leads that would otherwise be lost.

When a customer starts a pet insurance quote but does not complete it, the system automatically:

1. Captures the lead
2. Analyses the quote details
3. Identifies likely abandonment reasons
4. Generates a personalised recovery email using AI
5. Sends the email automatically
6. Logs the activity to Google Sheets for tracking

The goal is to reduce lead leakage and improve conversion opportunities without requiring manual follow-up.

---

## The Problem

Many businesses spend significant amounts on advertising to generate leads.

However, a large percentage of prospects abandon forms or quote requests before completing a purchase.

Common reasons include:

- Price concerns
- Distractions during the process
- Information overload
- Comparison shopping
- Lack of urgency

Without a recovery system, these leads are often lost permanently.

---

## The Solution

PetLead AI creates an automated recovery workflow that reacts immediately when a lead abandons a quote.

Instead of sending generic follow-up emails, the system uses AI to generate personalised messaging based on:

- Customer details
- Pet details
- Breed information
- Quote stage
- Premium amount
- Likely abandonment reason

This creates a more relevant and engaging follow-up experience.

---

## How It Works

### Step 1

Customer submits an abandoned quote through the demo form.

↓

### Step 2

n8n receives the webhook request.

↓

### Step 3

Lead information is normalised and enriched.

↓

### Step 4

AI analyses the lead and predicts the likely abandonment reason.

↓

### Step 5

AI generates a personalised recovery email.

↓

### Step 6

Lead information is stored in Google Sheets.

↓

### Step 7

Recovery activity is logged for reporting.

↓

### Step 8

Email is sent automatically through Gmail.

---

## Workflow Architecture

Quote Form

↓

Webhook

↓

Lead Normalisation

↓

Breed Intelligence

↓

AI Lead Analysis

↓

AI Email Generation

↓

Google Sheets Logging

↓

Gmail Delivery

↓

Recovery Tracking

---

## Tech Stack

### Frontend

- React
- Vite
- CSS

### Automation

- n8n

### AI

- GPT-4o Mini

### Data Storage

- Google Sheets

### Email Delivery

- Gmail API

### Hosting

- Vercel

---

## Features

### AI Lead Analysis

Automatically evaluates:

- Lead quality
- Likely abandonment reason
- Recovery opportunity
- Recommended action

### Personalised Recovery Emails

Creates dynamic emails tailored to each lead.

### Automated Workflow

No manual intervention required.

### CRM Logging

Stores lead activity for future reporting.

### Recovery Tracking

Creates a structured recovery history for each lead.

---

## Example Use Cases

### Pet Insurance

Recover abandoned insurance quotes.

### Mortgage Brokers

Recover incomplete loan enquiries.

### Dental Clinics

Follow up on treatment enquiries.

### Childcare Centres

Recover incomplete enrolment enquiries.

### Service Businesses

Recover abandoned contact forms and quote requests.

---

## Example Recovery Logic

Input:

- Customer: Jenny Wilson
- Pet: Rita
- Breed: Labrador
- Premium: $42/month
- Stage: Pricing Page

AI Output:

- Lead Score: 75
- Likely Reason: Comparison shopping
- Suggested Angle: Monthly value reassurance
- Action: Send recovery email

Automated Outcome:

- Recovery email generated
- Email delivered
- Lead logged
- Recovery activity recorded

---

## Results of This Proof of Concept

This project demonstrates:

- AI-powered lead analysis
- Automated customer recovery
- Workflow orchestration with n8n
- Real-world Gmail integration
- Live deployment and production hosting

---

## Why I Built This

I enjoy building systems that compound.

Rather than creating one-off automations, I focus on designing workflows that continuously generate value with minimal manual effort.

This project combines:

- AI
- Automation
- Product thinking
- Frontend development
- Growth systems

into a single working proof of concept.

---

## Future Improvements

- Multi-step recovery sequences
- SMS follow-up
- WhatsApp recovery messages
- CRM integrations
- A/B testing engine
- Conversion tracking
- PostHog analytics
- Agent-driven optimisation
- Lead scoring models
- Multi-channel campaigns

---

## Live Demo

https://petlead-ai-demo.vercel.app/

---

## Author

Kiran Simon

Sydney, Australia

GitHub: https://github.com/Madlad007
