# def build():
#     arr = (10**6)* [True]
#     arr[0], arr[1] = False, False
#     i=2
#     while (i**2) <= (10**6):
#         if arr[i] == True:

limit = 10**6   
MOD = 1000000007

def primes_sieve2():
    a = [True] * limit                          # Initialize the primality list
    a[0] = a[1] = False

    for (i, isprime) in enumerate(a):
        if isprime:
            # yield i
            for n in range(i*i, limit, i):     # Mark factors non-prime
                a[n] = False
    return a
# print(primes_sieve2())


def rec(number, i, dp):
    if dp[i] >= 0:
        return dp[i]
    
    # 1 based indexing
    if (i == 0):
        return 1
    cnt = 0
 
    # Consider every suffix 
    # up to 6 digits
    for j in range(1, 7):
 
        # Number should not have
        # a leading zero and
        # it should be a prime number
        if (i - j >= 0 and
            number[i - j] != '0' and
            isPrime(number[i - j : i])):
            cnt += rec(number,i - j, dp)
            cnt %= MOD
         
    # Return the final result
    dp[i] = cnt
    return cnt

def countPrimeStrings(s):
    dp = [-1] *(len(s) +1)
    return rec(s, len(s), dp)

s = '11373'
print(countPrimeStrings(s))


