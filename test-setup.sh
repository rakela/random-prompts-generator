#!/bin/bash

# Pre-Merge Setup Verification Script
# This script checks if your environment is properly configured

echo "=================================================="
echo "🧪 Pre-Merge Setup Verification"
echo "=================================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Counters
PASSED=0
FAILED=0
WARNINGS=0

# Function to check if a file exists
check_file() {
  if [ -f "$1" ]; then
    echo -e "${GREEN}✓${NC} Found: $1"
    ((PASSED++))
    return 0
  else
    echo -e "${RED}✗${NC} Missing: $1"
    ((FAILED++))
    return 1
  fi
}

# Function to check if env var is set in .env file
check_env_var() {
  local var_name=$1
  local is_required=$2

  if grep -q "^${var_name}=" .env 2>/dev/null; then
    # Check if it's not just a placeholder
    local value=$(grep "^${var_name}=" .env | cut -d'=' -f2)
    if [[ "$value" == *"your-"* ]] || [[ "$value" == *"..."* ]] || [ -z "$value" ]; then
      echo -e "${YELLOW}⚠${NC}  ${var_name} is set but looks like a placeholder"
      ((WARNINGS++))
      return 1
    else
      echo -e "${GREEN}✓${NC} ${var_name} is set"
      ((PASSED++))
      return 0
    fi
  else
    if [ "$is_required" = "required" ]; then
      echo -e "${RED}✗${NC} ${var_name} is NOT set (required)"
      ((FAILED++))
    else
      echo -e "${YELLOW}⚠${NC}  ${var_name} is NOT set (optional)"
      ((WARNINGS++))
    fi
    return 1
  fi
}

# Check if .env file exists
echo "📋 Step 1: Checking Configuration Files"
echo "----------------------------------------"
check_file ".env"
check_file ".env.example"
check_file "src/lib/supabase.ts"
check_file "src/pages/api/paypal/create-order.ts"
check_file "src/pages/api/paypal/capture-order.ts"
echo ""

# Check environment variables
echo "🔑 Step 2: Checking Environment Variables"
echo "----------------------------------------"

if [ ! -f ".env" ]; then
  echo -e "${RED}✗${NC} .env file not found! Copy .env.example to .env first."
  echo ""
  echo "Run: cp .env.example .env"
  echo "Then edit .env with your actual values."
  exit 1
fi

# Check Supabase vars (with fallbacks)
echo ""
echo "Supabase Configuration:"
echo "  (Checking for any of: PUBLIC_SUPABASE_URL, SUPABASE_URL, NEXT_PUBLIC_SUPABASE_URL)"
if ! check_env_var "PUBLIC_SUPABASE_URL" "optional" && \
   ! check_env_var "SUPABASE_URL" "optional" && \
   ! check_env_var "NEXT_PUBLIC_SUPABASE_URL" "optional"; then
  echo -e "${RED}✗${NC} No Supabase URL found! Set at least one of the above."
  ((FAILED++))
else
  # At least one was found
  echo -e "${GREEN}✓${NC} Supabase URL configured"
fi

echo "  (Checking for any of: PUBLIC_SUPABASE_ANON_KEY, SUPABASE_ANON_KEY, SUPABASE_PUBLISHABLE_KEY)"
if ! check_env_var "PUBLIC_SUPABASE_ANON_KEY" "optional" && \
   ! check_env_var "SUPABASE_ANON_KEY" "optional" && \
   ! check_env_var "SUPABASE_PUBLISHABLE_KEY" "optional"; then
  echo -e "${RED}✗${NC} No Supabase Anon Key found! Set at least one of the above."
  ((FAILED++))
else
  echo -e "${GREEN}✓${NC} Supabase Anon Key configured"
fi

check_env_var "SUPABASE_SERVICE_ROLE_KEY" "required"

# Check PayPal vars
echo ""
echo "PayPal Configuration:"
check_env_var "PAYPAL_CLIENT_ID" "required"
check_env_var "PAYPAL_CLIENT_SECRET" "required"
check_env_var "PAYPAL_MODE" "required"
check_env_var "PUBLIC_PAYPAL_CLIENT_ID" "required"

# Verify PAYPAL_CLIENT_ID matches PUBLIC_PAYPAL_CLIENT_ID
if grep -q "^PAYPAL_CLIENT_ID=" .env && grep -q "^PUBLIC_PAYPAL_CLIENT_ID=" .env; then
  PAYPAL_ID=$(grep "^PAYPAL_CLIENT_ID=" .env | cut -d'=' -f2)
  PUBLIC_PAYPAL_ID=$(grep "^PUBLIC_PAYPAL_CLIENT_ID=" .env | cut -d'=' -f2)
  if [ "$PAYPAL_ID" = "$PUBLIC_PAYPAL_ID" ]; then
    echo -e "${GREEN}✓${NC} PAYPAL_CLIENT_ID and PUBLIC_PAYPAL_CLIENT_ID match"
    ((PASSED++))
  else
    echo -e "${RED}✗${NC} PAYPAL_CLIENT_ID and PUBLIC_PAYPAL_CLIENT_ID don't match!"
    ((FAILED++))
  fi
fi

# Check Admin API Key
echo ""
echo "Admin Configuration:"
check_env_var "ADMIN_API_KEY" "required"

# Check OpenAI/Anthropic (at least one required)
echo ""
echo "LLM Provider Configuration:"
if ! check_env_var "OPENAI_API_KEY" "optional" && \
   ! check_env_var "ANTHROPIC_API_KEY" "optional"; then
  echo -e "${RED}✗${NC} Neither OPENAI_API_KEY nor ANTHROPIC_API_KEY is set!"
  echo "   Set at least one LLM provider API key."
  ((FAILED++))
fi

# Check dependencies
echo ""
echo "📦 Step 3: Checking Dependencies"
echo "----------------------------------------"

if [ -d "node_modules" ]; then
  echo -e "${GREEN}✓${NC} node_modules exists"
  ((PASSED++))
else
  echo -e "${RED}✗${NC} node_modules not found. Run: npm install"
  ((FAILED++))
fi

# Check for specific packages
if [ -f "package.json" ]; then
  if grep -q "@supabase/supabase-js" package.json; then
    echo -e "${GREEN}✓${NC} @supabase/supabase-js in package.json"
    ((PASSED++))
  else
    echo -e "${RED}✗${NC} @supabase/supabase-js not found in package.json"
    ((FAILED++))
  fi

  if grep -q "@paypal/checkout-server-sdk" package.json; then
    echo -e "${GREEN}✓${NC} @paypal/checkout-server-sdk in package.json"
    ((PASSED++))
  else
    echo -e "${RED}✗${NC} @paypal/checkout-server-sdk not found in package.json"
    ((FAILED++))
  fi
fi

# Check .gitignore
echo ""
echo "🔒 Step 4: Security Checks"
echo "----------------------------------------"

if [ -f ".gitignore" ]; then
  if grep -q "^\.env$" .gitignore || grep -q "^\.env" .gitignore; then
    echo -e "${GREEN}✓${NC} .env is in .gitignore"
    ((PASSED++))
  else
    echo -e "${RED}✗${NC} .env is NOT in .gitignore! Add it to prevent committing secrets."
    ((FAILED++))
  fi
else
  echo -e "${YELLOW}⚠${NC}  .gitignore not found"
  ((WARNINGS++))
fi

# Check if .env is tracked by git
if git ls-files --error-unmatch .env 2>/dev/null; then
  echo -e "${RED}✗${NC} WARNING: .env is tracked by git! This is a security risk!"
  echo "   Run: git rm --cached .env"
  ((FAILED++))
else
  echo -e "${GREEN}✓${NC} .env is not tracked by git"
  ((PASSED++))
fi

# Summary
echo ""
echo "=================================================="
echo "📊 Test Summary"
echo "=================================================="
echo -e "${GREEN}Passed:${NC}   $PASSED"
echo -e "${YELLOW}Warnings:${NC} $WARNINGS"
echo -e "${RED}Failed:${NC}   $FAILED"
echo ""

if [ $FAILED -eq 0 ]; then
  echo -e "${GREEN}✅ All critical checks passed!${NC}"
  echo ""
  echo "Next steps:"
  echo "1. Run the SQL schema in Supabase (see IMPLEMENTATION_GUIDE.md)"
  echo "2. Start dev server: npm run dev"
  echo "3. Follow PRE_MERGE_CHECKLIST.md for full testing"
  echo ""
  exit 0
else
  echo -e "${RED}❌ Some checks failed. Please fix the issues above.${NC}"
  echo ""
  echo "Common fixes:"
  echo "- Copy .env.example to .env: cp .env.example .env"
  echo "- Edit .env with your actual API keys"
  echo "- Run npm install to install dependencies"
  echo "- Add .env to .gitignore if not present"
  echo ""
  exit 1
fi
