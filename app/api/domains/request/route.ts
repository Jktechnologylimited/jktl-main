import {NextRequest,NextResponse} from 'next/server';
import {parseDomainRequest} from '@/lib/domain-catalogue';
import {saveInquiry} from '@/lib/inquiries';
export async function POST(request:NextRequest){
 const origin=request.headers.get('origin');if(origin&&origin!==new URL(request.url).origin)return NextResponse.json({error:'Please submit this request from the JKTL website.'},{status:403});
 let input;try{const body=await request.text();if(Buffer.byteLength(body,'utf8')>12000)return NextResponse.json({error:'Request is too large.'},{status:413});input=parseDomainRequest(JSON.parse(body));}catch(error){return NextResponse.json({error:error instanceof Error?error.message:'Please check your request.'},{status:400});}
 const saved=await saveInquiry({name:input.name,email:input.email,phone:input.phone,service:`Domain ${input.operation}`,message:`${input.operation}: ${input.domain} — one year. Confirm Go54 availability, eligibility, registration and renewal totals before payment.`,source:'domain-reseller',meta:{...input,provider:'Go54',provisioningStatus:'requested',availability:'unconfirmed'}});
 if(!saved)return NextResponse.json({error:'We could not save your request. Please try again or contact info@jktl.com.ng.'},{status:503});
 return NextResponse.json({ok:true,status:'requested',domain:input.domain,availability:'unconfirmed'},{status:201});
}
